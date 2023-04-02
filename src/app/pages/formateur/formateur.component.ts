import { EtablissementService } from 'src/app/services/etablissement.service';


import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { formateur } from 'src/app/entities/formateur.model';
import { Etablissement } from 'src/app/entities/etablissement.model';

import { AuthService } from 'src/app/services/auth.service';
import { formateurService } from 'src/app/services/formateur.service';


@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
  
export class FormateurComponent {
  public modalRef!: BsModalRef;
  public formateur!:  formateur [];
  public Formateur!:  formateur ;
  public editForm!: FormGroup;
 // public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public ajoutForm!: FormGroup; 
  selectedFile: any;
    Data!: Blob;
    dbimage: any;
    public etablissement!: Etablissement;
    public etablissements!: Etablissement[];
  
  

  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,public formateurService  : formateurService,private authService:AuthService,public etabService:EtablissementService) { }
 
  getFormateur() {
    this.formateurService.getFormateur().subscribe(response => {
      console.log(response);
     
      this.formateur = response;
   


      });
  }
  


//  onFileChange(event) {
//     this.Departement.file = event.target.files[0];
//   }
  public onFileChanged(event:any) {
  
   this.selectedFile = event.target.files[0];
   
  
}

  onSubmit (f: NgForm) {
  
    
  this.formateurService .addformateur ( this.selectedFile , f.value ).subscribe(response => {
    console.log(response);
    this.ngOnInit();  })
 
  this.modalService.hide(); //dismiss the modal
}

  // onSubmits() {
  //   this.departementService .addDepartement(
  //     this.Departement
  //   )
  // }

  ngOnInit(): void {
    
    this.getFormateur();
    console.log(this.authService.getToken())
    
    this.editForm = this.fb.group({
    
      codeFormateur: [''],
     
     // adresseApprenant: [''],
    file: [''],

       
     nomFormateur : [''],
      prenonFormateur: [''],
      telFormateur: [''],
  emailFormateur: [''],
     adresseFormateur: [''],
     specialite: [''],
    

    })

}


/************************ pop up****************** */
  openDetails(modalTemplate: TemplateRef<any>,  formateur :  formateur ) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({
      codeFormateur: formateur.codeFormateur,
     nomFormateur : formateur.nomFormateur,
      prenonFormateur: formateur.prenonFormateur,
      telFormateur: formateur.telFormateur,
  emailFormateur:formateur.emailFormateur,
     adresseFormateur: formateur.adresseFormateur,
     specialite: formateur.specialite,
    
 
     
      

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
  
    
  this.formateurService.updateFormateur(this.selectedFile,this.editForm.value).subscribe(response => {
      //console.log(response);
      window.location.reload();
      this.ngOnInit();})
   
    this.modalService.hide(); //dismiss the modal
  }
/***************************contoller ************** */

onControl(f: NgForm) {
  if (f.valid) {
    this.message = 'Formateur bien ajouté !';
  }
  if (f.invalid) {
    this.message = 'Formateur non ajoué ! Verifier votre formulaire !';
  }
}


/**********************Template delete ******************* */
openDelete(modalTemplate: TemplateRef<any>, formateur:formateur) {
  this.deleteId = formateur.codeFormateur
      this.modalRef = this.modalService.show(modalTemplate,
        {
          class: 'modal-dialogue-centered modal-md',
          backdrop: 'static',
          keyboard: true
        }
      );
}
 onDelete(Formateur: formateur) {
   this.formateurService.deleteFormateur(this.deleteId).subscribe(response => {
    console.log(response);
    this.ngOnInit();})
 
  this.modalService.hide(); //dismiss the modal
  } 
  


}