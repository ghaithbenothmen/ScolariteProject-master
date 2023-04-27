import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Role } from 'src/app/entities/role.model';
import { User } from 'src/app/entities/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { Apprenant } from 'src/app/entities/apprenant.model';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  

  
  user: User = {
    id:0,
    email:'',
    password: '',
    role: Role.User // Set default role value to empty string
  };

  public registerForm!: FormGroup;
  public items = ['Eleve', 'Etudiant', "demandeur  d'emploie", 'Professionel'];

  public errorMessage!: String;
 



  constructor(private appService: ApprenantService,private router: Router,private fb: FormBuilder,private userSer:UserService) { }

  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatchValidator });
  }
  
  private passwordsMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordsMismatch': true } : null;
  }

  onRegister(f: NgForm): void {
    // Check if the form is valid
    if (this.registerForm.valid) {
      f.value.emailApprenant=this.registerForm.value.email
      // Get the form values
      /* const email = this.registerForm.get('email').value;
      const password = this.registerForm.get('password').value; */
      this.appService.ajoutApp(f.value).subscribe(response => {
        response.emailApprenant=this.registerForm.value.email;
        console.log(this.registerForm.value.email)
        console.log(response.emailApprenant);
        
      })
      // Send the form data to the API
      this.userSer.register(this.user)
        .subscribe(
          () => {
          
            this.router.navigate(['/login'], { state: { message: 'Vous etes bien inscri ! Merci de se connecter.' } });
          },
          (error) => {
           
            this.errorMessage = error.message;
          }
        );
    }
  }

  /* onRegister(f: NgForm) {

    this.appService.ajoutApp(f.value).subscribe(response => {
      console.log(response);
      
    })

  } */
}
