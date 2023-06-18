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
  isButtonDisabled: boolean = false;
  countdown: number = 0;
  constructor(private http: HttpClient, private passwordService: ForgotService) { }

  ngOnInit(): void {


  }
  submitForm() {
    const formData = new FormData();
    
    formData.append('email', this.email);
  
    this.http.post<any>('http://192.168.1.180:8080/apprenant/api/Password/forgot_password', formData)
      .subscribe(
        response => {
          console.log(response);
          this.message = "Email bien envoyé. Veuillez vérifier votre boîte de réception.";
        },
        error => {
          console.log(error);
          if (error.status === 404) {
            this.error = "Adresse e-mail introuvable.";
            this.message = "";}
            else if (error.status === 200) {
              this.isButtonDisabled = true;
              this.message = "Email bien envoyé. Veuillez vérifier votre boîte de réception.";
              this.error = "";
              setTimeout(() => {
                this.isButtonDisabled = false;
              }, 60000);

 this.countdown = 60;
        const countdownInterval = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            // Enable the button when the countdown reaches 0
            this.isButtonDisabled = false;
            clearInterval(countdownInterval);
          }
        }, 1000);
            }
           else {
            this.error = "Une erreur s'est produite lors de l'envoi de l'e-mail.";
            this.message = "";
          }
        }
      );
  }
}