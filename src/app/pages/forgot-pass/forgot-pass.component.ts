import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ForgotService } from 'src/app/services/forgot.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
  email: string='';
  error!: string;
  message!: string;

  constructor(private http: HttpClient,private passwordService:ForgotService) {}

  submitForgotPasswordForm() {
    const email = 'ghaithbenothmen8@gmail.com'; // Replace with the actual email value
  
    this.http.post('http://localhost:8080/apprenant/api/Password/forgot_password', { email }).subscribe(
      (response) => {
        // Success response
        console.log('Password reset request successful:', response);
        // Handle the success response and redirect to the appropriate page
      },
      (error) => {
        // Error response
        console.error('Error while processing password reset request:', error);
        // Handle the error response and display an error message to the user
      }
    );
  }
  
  submitForm() {
    this.passwordService.forgotPassword(this.email).subscribe(
      response => {
        // Handle success response
        console.log(response);
      },
      error => {
        // Handle error response
        console.error(error);
      }
    );
  }
}
