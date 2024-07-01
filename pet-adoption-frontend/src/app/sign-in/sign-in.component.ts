import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';  

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  signInFormData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}  

  onSubmit() {
    this.http.post<any>(`${environment.apiUrl}/signin`, this.signInFormData).subscribe(
      (response) => {
        console.log('Sign-in successful', response);
        this.userService.signIn({  // Call signIn method from UserService
          firstName: response.firstName,
          lastName: response.lastName,
          email: this.signInFormData.email
        });
        this.router.navigate(['/']);  
      },
      (error) => {
        console.error('Error signing in:', error);
      }
    );
  }
}
