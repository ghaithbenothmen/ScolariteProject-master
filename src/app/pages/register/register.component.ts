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
  
  myForm!: FormGroup;
  
 

  public registerForm!: FormGroup;
  public items = ['Eleve', 'Etudiant', "Demandeur_emploie", 'Professionel'];
  public itemsNiveau = ['<Bac', 'Bac +3', "Bac +4", '>Bac +4'];
  public errorMessage!: String;
 



  constructor(private formBuilder: FormBuilder,private appService: ApprenantService,private router: Router,private fb: FormBuilder,private userSer:UserService) {
   
   /*  this.registerForm = this.formBuilder.group({
      prenomApprenant: ['', Validators.required],
      nomApprenant: ['', Validators.required],
      dateNaissanceApprenant: ['', Validators.required],
      telApprenant: ['', Validators.required],
      adresseApprenant: ['', Validators.required],
      qualiteApprenant: ['', Validators.required],
      sexeApprenant: ['', Validators.required],
      niveauApprenant: [''],
      email:[''],
      password:['']

    }); */
   }
 
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      dateNaissanceApprenant: ['', Validators.required],
      tel: ['', Validators.required],
      adresse: ['', Validators.required],
      qualiteApprenant: ['', Validators.required],
      sexeApprenant: ['', Validators.required],
      niveauApprenant: [''],
    }, { validator: this.passwordsMatchValidator });
  }
  
  private passwordsMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordsMismatch': true } : null;
  }

  onRegister(): void {
    
    //console.log(this.registerForm.value);
       
    // Check if the form is valid
    if (this.registerForm.valid) {
     
      // Get the form values
      /* const email = this.registerForm.get('email').value;
      const password = this.registerForm.get('password').value; */
      this.appService.ajoutApp(this.registerForm.value).subscribe(response => {
        console.log(response)
        this.router.navigate(['/login'], { state: { message: 'Vous etes bien inscri ! Merci de se verifier votre compte dans votre boite mail.' } });
        
      },
      
      (error) => {
        this.errorMessage = error.message;
      })
      // Send the form data to the API
      
    }
  }

  /* onRegister(f: NgForm) {

    this.appService.ajoutApp(f.value).subscribe(response => {
      console.log(response);
      
    })

  } */
}
