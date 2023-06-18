import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  submitForgotPasswordForm() {
    const email = 'ghaithbenothmen8@gmail.com'; // Replace with the actual email value
  
    this.http.post('http://192.168.1.180:8080/apprenant/api/Password/forgot_password', { email }).subscribe(
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

  private apiUrl = 'http://localhost:8080/apprenant/api/Password/forgot_password';

  constructor(private http: HttpClient,private authService:AuthService) { }

  forgotPassword(email: string) {


  
    return this.http.post(this.apiUrl, { email });
  }
}
