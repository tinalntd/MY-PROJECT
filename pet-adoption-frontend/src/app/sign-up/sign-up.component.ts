import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpFormData = {
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>(`${environment.apiUrl}/signup`, this.signUpFormData).subscribe(
      (response) => {
        console.log('Sign-up successful', response);
        this.router.navigate(['/sign-in']);  // Navigate to the sign-in page after successful sign-up
      },
      (error) => {
        console.error('Error signing up:', error);
      }
    );
  }
}
