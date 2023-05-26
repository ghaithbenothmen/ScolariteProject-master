import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { Formateur } from 'src/app/entities/formateur.model';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { formateurService } from 'src/app/services/formateur.service';

@Component({
  selector: 'app-edit-formateur',
  templateUrl: './edit-formateur.component.html',
  styleUrls: ['./edit-formateur.component.css']
})
export class EditFormateurComponent {
  public modalRef!: BsModalRef;
  public formateurs!: Formateur[];
  public formateur!: Formateur;
  public id !: number;
  public UserId !: string | null;
  public editForm!: FormGroup;
  public idUser!: number;
  errorMessage!: string;
  successMessage!:string;
  public items = ['Eleve', 'Etudiant', "demandeur  d'emploie", 'Professionel'];
  selectedFile: any;

  constructor( private fb: FormBuilder, private forService: formateurService, private route:ActivatedRoute , private modalService: BsModalService) { } 

onreload(){
  window.location.reload();
}

onSave(): void {
  if (this.editForm.valid || this.isFormPartialValid()) {
   
    this.forService.updateFormateur(this.selectedFile,this.editForm.value).subscribe(
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

  // Return true if  password and confirmPassword fields are empty or null
  return (!passwordControl?.value && !confirmPasswordControl?.value);
}

  getApprenants() {
    this.forService.getFormateur().subscribe(response => {
      //console.log('app',response);
      //this.apprenants = response;
   
      this.formateurs = response.filter(formateur => formateur.id === this.idUser); //nafsha f html 
       console.log(this.formateurs)
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
    console.log("lklk",this.UserId);

      this.editForm = this.fb.group({
            
      id: [''],
     
      // adresseApprenant: [''],
       file: [''], 
      nomFormateur : [''],
       prenonFormateur: [''],
       telFormateur: [''],
      email: [''],
       
      adresseFormateur: [''],
      specialite: [''],
     
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
