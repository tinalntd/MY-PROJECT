from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash  # Added check_password_hash for password verification
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import mysql.connector
import os

app = Flask(__name__)

# Configure CORS to allow requests from Angular frontend
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

# Configure SQLAlchemy connection
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'mysql+mysqlconnector://pet_adoption_admin:admin2024@localhost/pet_adoption')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable track modifications to avoid warnings

db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(255), nullable=False)

# Create the database schema 
with app.app_context():
    db.create_all()

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Validate the input data
    required_fields = ['first_name', 'last_name', 'email', 'address', 'phone', 'password']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
        return jsonify({'status': 'error', 'message': f'Missing fields: {", ".join(missing_fields)}'}), 400

    hashed_password = generate_password_hash(data.get('password'), method='pbkdf2:sha256')
    new_user = User(
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        email=data.get('email'),
        address=data.get('address'),
        phone=data.get('phone'),
        password=hashed_password
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'User created successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Check for missing fields
    if not email or not password:
        return jsonify({'status': 'error', 'message': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        return jsonify({
             'status': 'success',
            'message': 'Sign-in successful',
            'firstName': user.first_name,
            'lastName': user.last_name
        })
    else:
        return jsonify({'status': 'error', 'message': 'Invalid email or password'}), 401

@app.route('/api/vets/areas', methods=['GET'])
def get_vet_areas():
    try:
        # Fetch the areas from the `vets` table
        conn = mysql.connector.connect(
            host=os.getenv('MYSQL_HOST', 'localhost'),
            user=os.getenv('MYSQL_USER', 'pet_adoption_admin'),
            password=os.getenv('MYSQL_PASSWORD', 'admin2024'),
            database=os.getenv('MYSQL_DB', 'pet_adoption')
        )
        cursor = conn.cursor()
        cursor.execute('SELECT DISTINCT area FROM vets')
        areas = [row[0] for row in cursor.fetchall()]
        cursor.close()
        conn.close()
        return jsonify(areas)
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/vets', methods=['GET'])
def get_vets():
    area = request.args.get('area')
    try:
        conn = mysql.connector.connect(
            host=os.getenv('MYSQL_HOST', 'localhost'),
            user=os.getenv('MYSQL_USER', 'pet_adoption_admin'),
            password=os.getenv('MYSQL_PASSWORD', 'admin2024'),
            database=os.getenv('MYSQL_DB', 'pet_adoption')
        )
        cursor = conn.cursor(dictionary=True)
        if area:
            cursor.execute('SELECT * FROM vets WHERE area = %s', (area,))
        else:
            cursor.execute('SELECT * FROM vets')
        vets = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(vets)
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
