import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ForgotService } from 'src/app/services/forgot.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
email!: string;
  error!: string;
  message!: string;
  constructor(private http: HttpClient, private passwordService: ForgotService) { }

  submitForm() {
    const formData = new FormData();
    formData.append('email', this.email);

    this.http.post<any>('http://localhost:8080/apprenant/api/Password/forgot_password', formData)
      .subscribe(
        response => {
          this.message = response.message;
          this.error = "f";
        },
        error => {
          this.message = "oki";
          this.error = error.error;
        }
      );
  }
}