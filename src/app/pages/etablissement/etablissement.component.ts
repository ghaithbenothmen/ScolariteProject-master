
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AuthService } from 'src/app/services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';

export class Etablissement {
    constructor(
      
      public codeEtablissement: number,
      public nomEtablissement: string,
      public abreviationEtablissement: string,
      public telEtablissement: number,
      public emailEtablissement: string,
      public remarqueEtablissement: string,
      public data: Blob,
      public file: File,
      public fileType :string,
      
    
    ) {
    }
  }
@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
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
   
    
  this.etabService.updateetab(this.selectedFile ,this.editForm.value).subscribe(response => {
      console.log(response);
   
      this.ngOnInit();})
   
    this.modalService.hide(); //dismiss the modal
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