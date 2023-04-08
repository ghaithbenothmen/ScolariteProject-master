import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/entities/role.model';
import { User } from 'src/app/entities/user.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user:User = {
    email:'',
    password: '',
    role: Role.User // Set default role value to empty string
  };

  public registerForm!: FormGroup;
  
  public errorMessage!: String;

  //message register
  private registrationSuccessSubject = new Subject<string>();

  registrationSuccess$ = this.registrationSuccessSubject.asObservable();
  message!: string; // Add message variable
/////////////////////////////////////////


  constructor(private router: Router,private fb: FormBuilder,private userSer:UserService) { }

  
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

  onSubmit(): void {
    // Check if the form is valid
    if (this.registerForm.valid) {
      // Get the form values
      /* const email = this.registerForm.get('email').value;
      const password = this.registerForm.get('password').value; */
  
      // Send the form data to the API
      this.userSer.register(this.user)
        .subscribe(
          () => {
            // Registration successful, redirect to login page
            this.router.navigate(['/login']);
          },
          (error) => {
            // Registration failed, show error message
            this.errorMessage = error.message;
          }
        );
    }
  }
}
