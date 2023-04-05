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
import { formateurService } from 'src/app/services/formateur.service';
import { formateur} from 'src/app/entities/formateur.model';
@Component({
  selector: 'app-session-formation',
  templateUrl: './session-formation.component.html',
  styleUrls: ['./session-formation.component.css']
})
export class SessionFormationComponent {
 public items = ['En ligne', 'Présentiel'];
  public modalRef!: BsModalRef;
  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public themeDeFormations!: ThemeDeFormation[];
  public themeDeFormation!: ThemeDeFormation;
  public formateurs!: formateur[];
  public formateur!: formateur;
  
  public idFormation!: number;
  public codeFormateur!: number;

  public editForm!: FormGroup;
 // public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public ajoutForm!: FormGroup; 
  selectedFile: any;
    Data!: Blob;
    dbimage: any;
  idFormateur: any;
  idTh: any;
  //SessionFormationService: any;
  
  
  

  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,public formateurService :formateurService ,public SessionFormationService : SessionFormationService,public ThemeDeFormationService:ThemeDeFormationService,private authService:AuthService) { }
 public onFileChanged(event:any) {
  
   this.selectedFile = event.target.files[0];
   
  
}
  getSessionFormation() {

    this.SessionFormationService.getSessionFormation().subscribe(response => {
      console.log(response);
     
      this.sessionFormations = response;
   
    });
    this.formateurService.getFormateur().subscribe(response => {
      console.log(response);
     
      this.formateurs = response;
   
    });
    this.ThemeDeFormationService.getThemeDeFormation().subscribe(response => {
      console.log(response);
     
      this.themeDeFormations = response;
   
    });


  }


//  onFileChange(event) {
//     this.Departement.file = event.target.files[0];
//   }
//   public onFileChanged(event:any) {
  
//    this.selectedFile = event.target.files[0];
   
  
// }

  onSubmit (f:NgForm) {
  
  //   this.SessionFormationService.addimage(this.selectedFile).subscribe(response => {
  //  console.log(response);
  //    this.ngOnInit();  })
  this.ngOnInit();
   f.value.themeDeFormation = this.themeDeFormations.find(ThemeDeFormation => ThemeDeFormation.idFormation == this.idTh);
   f.value.formateur = this.formateurs.find(formateur => formateur.codeFormateur == this.idFormateur);
  
    
    this.SessionFormationService.addSessionFormation(f.value , this.selectedFile).subscribe(response => {
    
      console.log(response);
       window.location.reload();
      this.ngOnInit();

        })
 
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
      nomformateur: [''],
      dateDebut: [''],
      nbrHeures: [''],
    codeFormateur: [''],
      file: [''],
idSessionFormation:['']



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
      //idFormation: SessionFormation.themeDeFormation.nomFormation,
      typeFormation:SessionFormation.typeFormation,
     localFormation:SessionFormation.localFormation,
      description: SessionFormation.description,
     codeFormateur: SessionFormation.formateur.codeFormateur,
      dateDebut: SessionFormation.dateDebut,
      nbrHeures: SessionFormation.nbrHeures,
     //file:SessionFormation.data,
    idFormation:SessionFormation.themeDeFormation.idFormation,
    idSessionFormation:SessionFormation.idSessionFormation
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
   
 this.editForm.value.themeDeFormation = this.themeDeFormations.find(ThemeDeFormation => ThemeDeFormation.idFormation == this.editForm.value.idFormation);
this.editForm.value.formateur = this.formateurs.find(formateur => formateur.codeFormateur == this.editForm.value.codeFormateur);
  
  this.SessionFormationService.updateSessionFormation(this.editForm.value ,this.selectedFile ).subscribe(response => {
    console.log(this.editForm.value);
 
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


