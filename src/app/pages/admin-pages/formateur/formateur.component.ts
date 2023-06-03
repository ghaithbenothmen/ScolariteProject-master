import { EtablissementService } from 'src/app/services/etablissement.service';


import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Formateur } from 'src/app/entities/formateur.model';
import { Etablissement } from 'src/app/entities/etablissement.model';

import { AuthService } from 'src/app/services/auth.service';
import { formateurService } from 'src/app/services/formateur.service';


@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css','../apprenant/apprenant.component.css']
})
  
export class FormateurComponent {
  public modalRef!: BsModalRef;
  public formateur!:  Formateur [];
  public Formateur!:  Formateur ;
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
    public numberOfFormateurs!: number;
    errorMessage!: string;
    successMessage!:string;

  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,public formateurService  : formateurService,private authService:AuthService,public etabService:EtablissementService) { }
  //Pagination//
  page:number=1;
  count:number=0;
  tableSize:number=3;
  onTableChange(event:any){
    this.page=event;
    this.getFormateur();

  }

  getFormateur() {
    this.formateurService.getFormateur().subscribe(response => {
      console.log(response);
     
      this.formateur = response;
      this.numberOfFormateurs=response.length;


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
    this.successMessage = "Formateur ajouté avec succès";
    this.ngOnInit();  
  }, error => {
    this.errorMessage = "Erreur lors de l'ajout du formateur, vérifier votre formulaire";
    this.ngOnInit();  

  });
    this.ngOnInit();  
 
  this.modalService.hide(); //dismiss the modal
}



  ngOnInit(): void {
    
    this.getFormateur();
    console.log(this.authService.getToken())
    
    this.editForm = this.fb.group({
    
      id: [''],
     
     // adresseApprenant: [''],
      file: [''], 
     nomFormateur : [''],
      prenonFormateur: [''],
      telFormateur: [''],
     email: [''],
      password:[''] ,
     adresseFormateur: [''],
     specialite: [''],
    

    })

}


/************************ pop up****************** */
  openDetails(modalTemplate: TemplateRef<any>,  formateur :  Formateur ) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({
      id: formateur.id,
     nomFormateur : formateur.nomFormateur,
      prenonFormateur: formateur.prenonFormateur,
      telFormateur: formateur.telFormateur,
      email:formateur.email,
      password:'',
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
  
   
  this.formateurService.updateFormateur(this.selectedFile,this.editForm.value).subscribe(
    response => {
      console.log(response);
      this.errorMessage = '';
      this.successMessage = 'Formateur a été bien modifiées.';
      this.ngOnInit();
    },
    error => {
      
      this.errorMessage = 'Vérifiez votre formulaire.';
      this.successMessage = '';
      this.ngOnInit();
    }
  );
  this.modalService.hide();
  this.ngOnInit();

}



/**********************Template delete ******************* */
openDelete(modalTemplate: TemplateRef<any>, formateur:Formateur) {
  this.deleteId = formateur.id
      this.modalRef = this.modalService.show(modalTemplate,
        {
          class: 'modal-dialogue-centered modal-md',
          backdrop: 'static',
          keyboard: true
        }
      );
}
 onDelete(Formateur: Formateur) {
   this.formateurService.deleteFormateur(this.deleteId).subscribe(response => {
    console.log(response);
    this.ngOnInit();})
 
  this.modalService.hide(); //dismiss the modal
  } 
  


}