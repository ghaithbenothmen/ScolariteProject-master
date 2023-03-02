
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AuthService } from 'src/app/services/auth.service';
import { DepartementService } from 'src/app/services/departement.service';

export class Departement {
    constructor(
      
      public codeDepartement: number,
      public nomDepartement: string,
      public abreviationDepartement: string,
      public telDepartement: number,
      public emailDepartement: string,
      public remarqueDepartement: string,
      public data: Blob,
      public file: File,
      public fileType :string,
      
    
    ) {
    }
  }
@Component({
  selector: 'app-Departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
  
export class DepartementComponent {
  public modalRef!: BsModalRef;
  public Departements!: Departement[];
  public Departement!: Departement;
  public editForm!: FormGroup;
 // public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public ajoutForm!: FormGroup; 
  selectedFile: any;
    Data!: Blob;
    dbimage: any;

  
  

  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,public departementService  : DepartementService,private authService:AuthService,) { }
 
  getDepartement() {
    this.departementService.getDepartement().subscribe(response => {
      console.log(response);
     
      this.Departements = response;
   


      });
  }
  


//  onFileChange(event) {
//     this.Departement.file = event.target.files[0];
//   }
  public onFileChanged(event:any) {
  
   this.selectedFile = event.target.files[0];
   
  
}

  onSubmit (f: NgForm) {
  
    
  this.departementService .addDepartement( this.selectedFile , f.value ).subscribe(response => {
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
    this.getDepartement()
    console.log(this.authService.getToken())
    
    this.editForm = this.fb.group({
    
      codeDepartement: [''],
      nomDepartement: [''],
      abreviationDepartement: [''],
      remarqueDepartement: [''],
   
      emailDepartement: [''],
      telDepartement: [''],
     // adresseApprenant: [''],
      file: [''],


    })

}


/************************ pop up****************** */
  openDetails(modalTemplate: TemplateRef<any>, Departement: Departement) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({
      codeDepartement: Departement.codeDepartement,
      nomDepartement: Departement.nomDepartement,
      abreviationDepartement: Departement.abreviationDepartement,
      remarqueDepartement: Departement.remarqueDepartement,
  
      emailDepartement: Departement.emailDepartement,
      telDepartement: Departement.telDepartement,
      adresseApprenant: Departement.abreviationDepartement,
 
     
      

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
  
    
  this.departementService.updatedepart(this.selectedFile ,this.editForm.value).subscribe(response => {
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