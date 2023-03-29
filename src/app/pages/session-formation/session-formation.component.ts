//import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ThemeDeFormation } from 'src/app/entities/ThemeDeFormation.model';
import { ThemeDeFormationService } from 'src/app/services/theme-de-formation.service';
import { AuthService } from 'src/app/services/auth.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {SessionFormationService} from 'src/app/services/session-formation.service';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
@Component({
  selector: 'app-session-formation',
  templateUrl: './session-formation.component.html',
  styleUrls: ['./session-formation.component.css']
})
export class SessionFormationComponent {

  public modalRef!: BsModalRef;
  public SessionFormation!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public editForm!: FormGroup;
 // public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public ajoutForm!: FormGroup; 
  selectedFile: any;
    Data!: Blob;
    dbimage: any;
  //SessionFormationService: any;
  
  
  

  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,public SessionFormationService : SessionFormationService,private authService:AuthService) { }
 public onFileChanged(event:any) {
  
   this.selectedFile = event.target.files[0];
   
  
}
  getSessionFormation() {

    this.SessionFormationService.getSessionFormation().subscribe(response => {
      console.log(response);
     
      this.sessionFormation= response;
   
      });
  }
  


//  onFileChange(event) {
//     this.Departement.file = event.target.files[0];
//   }
//   public onFileChanged(event:any) {
  
//    this.selectedFile = event.target.files[0];
   
  
// }

  onSubmit (f: NgForm) {
  
    this.SessionFormationService.addimage(this.selectedFile).subscribe(response => {
    console.log(response);
    this.ngOnInit();  })
 

  this.SessionFormationService.addSessionFormation(f.value).subscribe(response => {
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
    
    this.getSessionFormation();
    console.log(this.authService.getToken())
    
    this.editForm = this.fb.group({
    
        idFormation: [''],
     typeFormation: [''],
   localFormation: [''],
      description: [''],
      formateur: [''],
      fateDebut: [''],
      nbrHeures: [''],
      themeFormation: [''],
          
   



    })

}


/************************ pop up****************** */
  openDetails(modalTemplate: TemplateRef<any>, SessionFormation: SessionFormation) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({
      idFormation: SessionFormation.idSessionFormation,
      typeFormation:SessionFormation.typeFormation,
     localFormation:SessionFormation.localFormation,
      description: SessionFormation.description,
      formateur: SessionFormation.formateur,
      dateDebut: SessionFormation.dateDebut,
      nbrHeures: SessionFormation.nbrHeures,
     
      themeFormation:SessionFormation.themeDeFormation

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
  
    
  this.SessionFormationService.updateSessionFormation(this.editForm.value).subscribe(response => {
      //console.log(response);
      window.location.reload();
      this.ngOnInit();})
   
    this.modalService.hide(); //dismiss the modal
  }
/***************************contoller ************** */

onControl(f: NgForm) {
  if (f.valid) {
    this.message = 'Actualite bien ajouté !';
  }
  if (f.invalid) {
    this.message = 'Actualite non ajoué ! Verifier votre formulaire !';
  }
}


/**********************Template delete ******************* */
openDelete(modalTemplate: TemplateRef<any>, SessionFormation: SessionFormation) {
  this.deleteId=SessionFormation.idSessionFormation;
      this.modalRef = this.modalService.show(modalTemplate,
        {
          class: 'modal-dialogue-centered modal-md',
          backdrop: 'static',
          keyboard: true
        }
      );
}
 onDelete( SessionFormation : SessionFormation) {
   this.SessionFormationService.deleteSessionFormation(this.deleteId).subscribe(response => {
    console.log(response);
    
    this.ngOnInit();})
 
  this.modalService.hide(); //dismiss the modal
  } 
  


}


