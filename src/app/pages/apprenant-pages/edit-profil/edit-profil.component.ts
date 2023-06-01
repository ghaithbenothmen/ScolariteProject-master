import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { ApprenantService } from 'src/app/services/apprenant.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent {
  public modalRef!: BsModalRef;
  public apprenants!: Apprenant[];
  public apprenant!: Apprenant;
  public id !: number;
  public UserId !: string | null;
  public editForm!: FormGroup;
  public idUser!: number;
  errorMessage!: string;
  successMessage!:string;
  public items = ['Eleve', 'Etudiant', "demandeur  d'emploie", 'Professionel'];

  constructor( private fb: FormBuilder, private appService: ApprenantService, private route:ActivatedRoute , private modalService: BsModalService) { } 



  onSave(): void {
  if (this.editForm.valid || this.isFormPartialValid()) {
    console.log("id", this.editForm.value);
    console.log("id", this.editForm.value.id);

    this.appService.updateApp(this.editForm.value).subscribe(
      response => {
        console.log(response);
        this.errorMessage = '';
        this.successMessage = 'Vos informations ont été bien modifiées.';
        this.ngOnInit();
      },
      error => {
        console.error('Error saving inscription:', error);
        this.errorMessage = 'Vérifiez votre formulaire.';
        this.successMessage = '';
      }
    );

    this.ngOnInit();
  } else {
    this.errorMessage = 'Vérifiez votre formulaire.';
  }
  
}

isFormPartialValid(): boolean {
  const passwordControl = this.editForm.get('password');
  const confirmPasswordControl = this.editForm.get('confirmPassword');

  // Return true if both password and confirmPassword fields are empty or null
  return (!passwordControl?.value && !confirmPasswordControl?.value);
}

  getApprenants() {
    this.appService.getApprenants().subscribe(response => {
      //console.log('app',response);
      //this.apprenants = response;
   
      this.apprenants = response.filter(app => app.id === this.idUser); //nafsha f html 

    for(let app of this.apprenants){
      console.log('bool',app.verified)
      this.apprenant=app
    }
    console.log('bool',this.apprenant.verified)
    });
  }

  private passwordsMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
  
    // Skip validation if both password and confirmPassword fields are empty
    if (!password?.value && !confirmPassword?.value) {
      return null;
    }
  
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }
  
    return null;
  }
  
  ngOnInit(): void {

  


   
this.getApprenants();
    //this.id=this.route.snapshot.paramMap.get("id");
    this.id = this.route.snapshot.params["id"];

    this.UserId = localStorage.getItem('UserId');
    this.idUser=Number(this.UserId) 
    console.log("id",this.UserId);
   

      this.editForm = this.fb.group({
        id: [''],
  
        nomApprenant: [''],
        prenomApprenant: [''],
        /* sexeApprenant: [''], */
        dateNaissanceApprenant: [''],

        email: ['', [Validators.required,Validators.email]],

        
        telApprenant: [''],
        adresseApprenant: [''],
        archiveApprenant: [''],
        sexeApprenant: [''],
        niveauApprenant: [''],
        qualiteApprenant: [''],
        confirmPassword: [''],
        password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      
  
      }, { validator: this.passwordsMatchValidator });
  
  }

  openModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
  }
}
