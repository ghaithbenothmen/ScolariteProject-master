
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Etablissement } from 'src/app/entities/etablissement.model';

import { AuthService } from 'src/app/services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';


  
@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css','../apprenant/apprenant.component.css']
})
  
export class EtablissementComponent {
  public modalRef!: BsModalRef;
  public etablissements!: Etablissement[];
  public etablissement!: Etablissement;
  public editForm!: FormGroup;
 // public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public ajoutForm!: FormGroup; 
  selectedFile: any;
    Data!: Blob;
    dbimage: any;

    errorMessage!: string;
    successMessage!:string;
  

  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,public etabService : EtablissementService,private authService:AuthService,) { }
 
  getEtablissement() {
    this.etabService.getEtablissements().subscribe(response => {
      console.log(response);
     
      this.etablissements = response;
      });
  }

 
  


//  onFileChange(event) {
//     this.etablissement.file = event.target.files[0];
//   }
  public onFileChanged(event:any) {
  
   this.selectedFile = event.target.files[0];

}

  onSubmit (f: NgForm) {
  
    
  this.etabService.addEtablissement( this.selectedFile , f.value ).subscribe(response => {
    console.log(response);
    this.ngOnInit();  })
 
  this.modalService.hide(); //dismiss the modal
}

  // onSubmits() {
  //   this.etabService.addEtablissement(
  //     this.etablissement
  //   )
  // }

  ngOnInit(): void {
    this.getEtablissement()
    console.log(this.authService.getToken())
    
    this.editForm = this.fb.group({
    
      codeEtablissement: [''],
      nomEtablissement: [''],
      abreviationEtablissement: [''],
      remarqueEtablissement: [''],
   
      emailEtablissement: [''],
      telEtablissement: [''],
     // adresseApprenant: [''],
      file: [''],


    })

}


/************************ pop up****************** */
  openDetails(modalTemplate: TemplateRef<any>, etablissement: Etablissement) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({
      codeEtablissement: etablissement.codeEtablissement,
      nomEtablissement: etablissement.nomEtablissement,
      abreviationEtablissement: etablissement.abreviationEtablissement,
      remarqueEtablissement: etablissement.remarqueEtablissement,
  
      emailEtablissement: etablissement.emailEtablissement,
      telEtablissement: etablissement.telEtablissement,
      adresseApprenant: etablissement.abreviationEtablissement,
 
     
      

    });

     

    
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
onSave() {
   
    
  this.etabService.updateetab(this.selectedFile ,this.editForm.value).subscribe(
    (response) => {
      // Inscription saved successfully
      // Do any additional actions here if needed
      this.errorMessage = '';
      this.successMessage = 'Les informations de établissement sont bien à jour .';
      this.ngOnInit();
    },
    (error) => {
      // Error occurred
      console.error('Error saving apprenant:', error);
      this.errorMessage = 'Les informations de établissement non modifier veuillez verifier votre formulaire.';
      this.successMessage = '';
    })

  this.modalService.hide(); 

  }
/***************************contoller ************** */

onControl(f: NgForm) {
  if (f.valid) {
    this.message = 'Apprenant bien ajouté !';
  }
  if (f.invalid) {
    this.message = 'Apprenant non ajoué ! Verifier votre formulaire !';
  }
}
}