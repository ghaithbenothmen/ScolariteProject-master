import { Actualite } from './../../../entities/actualite.model';
import { ActualiteService } from './../../../services/actualite.service';
import { EtablissementService } from 'src/app/services/etablissement.service';


import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-Departement',
  templateUrl: './actualite.component.html',
  styleUrls: ['./actualite.component.css','../apprenant/apprenant.component.css']
})
  
export class ActualiteComponent {
  public modalRef!: BsModalRef;
  public Actualites!: Actualite[];
  public actualite!: Actualite;
  public editForm!: FormGroup;
 // public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public ajoutForm!: FormGroup; 
  selectedFile: any;
    Data!: Blob;
    dbimage: any;
    public numberActu!:number;
    errorMessage!: string;
    successMessage!:string;
  noDataAvailable!: boolean;
  
  

  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,public actualiteService  : ActualiteService,private authService:AuthService,public etabService:EtablissementService) { }
  //Pagination//
  page:number=1;
  count:number=0;
  tableSize:number=3;
  onTableChange(event:any){
    this.page=event;
    this.getActualite();

  }

  getActualite() {
    this.actualiteService.getActualite().subscribe(response => {
      console.log(response);
     this.numberActu=response.length;
      this.Actualites = response;
      this.numberActu=response.length;
      if (response.length === 0) {
        this.noDataAvailable = true;
      } else {
        this.noDataAvailable = false;
      }
   
      });
  }
  


//  onFileChange(event) {
//     this.Departement.file = event.target.files[0];
//   }
  public onFileChanged(event:any) {
  
   this.selectedFile = event.target.files[0];
   
  
}

  onSubmit (f: NgForm) {
  
    
  this.actualiteService .addActualite( this.selectedFile , f.value ).subscribe(
    (response) => {
      // Inscription saved successfully
      // Do any additional actions here if needed
      this.errorMessage = '';
      this.successMessage = 'Actualité bien ajouté .';
      this.ngOnInit();
    },
    (error) => {
      // Error occurred
      console.error('Error saving Actualité:', error);
      this.errorMessage = 'Actualité non ajouté veuillez verifier votre formulaire.';
      this.successMessage = '';
    })

  this.modalService.hide(); //dismiss the modal
}

  ngOnInit(): void {
    
    this.getActualite();
    console.log(this.authService.getToken())
    
    this.editForm = this.fb.group({
    
      codeActualite: [''],
      titreActualite: [''],
      descriptionActualite: [''],
      dateActualite: [''],
      heureDebut:[''],
      file: [''],
    fileType: [''],
   dataa:[''],
    })

}


/************************ pop up****************** */
  openDetails(modalTemplate: TemplateRef<any>, Actualite: Actualite) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({
      codeActualite: Actualite.codeActualite,
      titreActualite: Actualite.titreActualite,
      descriptionActualite: Actualite.descriptionActualite,
      dateActualite: Actualite.dateActualite,
      heureDebut: Actualite.heureDebut,
      dataa: Actualite.data,

      fileType: Actualite.fileType,
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
  
    
  this.actualiteService.updateActualite(this.selectedFile ,this.editForm.value).subscribe(
    (response) => {
      // Inscription saved successfully
      // Do any additional actions here if needed
      this.errorMessage = '';
      this.successMessage = 'Actualité bien modifié .';
      this.ngOnInit();
    },
    (error) => {
      // Error occurred
      console.error('Error saving Actualité:', error);
      this.errorMessage = 'Actualité non modifié veuillez verifier votre formulaire.';
      this.successMessage = '';
    })

  this.modalService.hide(); //dismiss the modal
}



/**********************Template delete ******************* */
openDelete(modalTemplate: TemplateRef<any>, actualite: Actualite) {
  this.deleteId=actualite.codeActualite;
      this.modalRef = this.modalService.show(modalTemplate,
        {
          class: 'modal-dialogue-centered modal-md',
          backdrop: 'static',
          keyboard: true
        }
      );
}
 onDelete(actualite : Actualite) {
   this.actualiteService.deleteActualite(this.deleteId).subscribe(response => {
    console.log(response);
    
    this.ngOnInit();})
 
  this.modalService.hide(); //dismiss the modal
  } 
  


}