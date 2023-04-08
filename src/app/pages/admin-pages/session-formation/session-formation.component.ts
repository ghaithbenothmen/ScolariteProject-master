//import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ThemeDeFormation } from 'src/app/entities/ThemeDeFormation.model';
import { ThemeDeFormationService } from 'src/app/services/theme-de-formation.service';
import { AuthService } from 'src/app/services/auth.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SessionFormationService } from 'src/app/services/session-formation.service';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { formateurService } from 'src/app/services/formateur.service';
import { Formateur } from 'src/app/entities/formateur.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute } from '@angular/router';
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
  public formateurs!: Formateur[];
  public formateur!: Formateur;

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




  constructor( private modalService: BsModalService,  private fb: FormBuilder, public formateurService: formateurService, public SessionFormationService: SessionFormationService, public ThemeDeFormationService: ThemeDeFormationService, private authService: AuthService) { }
  public onFileChanged(event: any) {

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

  /*  getSessionFormation() {
 
     this.SessionFormationService.getSessionFormation().subscribe(response => {
 
       this.formateurService.getFormateur().subscribe(foreignKeys => {
         this.sessionFormations = response.map(example => {
           const foreignKey = foreignKeys.find(fk => fk.codeFormateur === example.codeFormateur);
           return { ...example, foreignKey };
        
         
      
       });
       
     });
   });
 } */




  onSubmit(f: NgForm) {

    this.ngOnInit();
    f.value.themeDeFormation = this.themeDeFormations.find(ThemeDeFormation => ThemeDeFormation.idFormation == this.idTh);
    f.value.formateur = this.formateurs.find(formateur => formateur.codeFormateur == this.idFormateur);


    this.SessionFormationService.addSessionFormation(f.value, this.selectedFile).subscribe(response => {

      console.log(response);
      window.location.reload();
      this.ngOnInit();

    })

    this.modalService.hide(); //dismiss the modal
  }



  ngOnInit(): void {

    this.getSessionFormation();
    console.log(this.authService.getToken());

    this.editForm = this.fb.group({

      idFormation: [''],
      
      idSessionFormation: [''],
      typeFormation: [''],
      localFormation: [''],
      description: [''],

      codeFormateur: [],
      dateDebut: [''],
      nbrHeures: [''],


      file: [''],





    })

    this.SessionFormationService.getSessionFormation().subscribe(sessionFormations => {

      this.formateurService.getFormateur().subscribe(foreignKeys => {
        this.sessionFormations = sessionFormations.map(example => {
          const foreignKey = foreignKeys.find(fk => fk.codeFormateur === example.codeFormateur);

          return { ...example, foreignKey };



        });

      });
      
      this.ThemeDeFormationService.getThemeDeFormation().subscribe(foreignKeys => {
        this.sessionFormations = sessionFormations.map(example => {
          const foreignKeyTh = foreignKeys.find(fk => fk.idFormation === example.idFormation);

          return { ...example, foreignKeyTh };



        });

      });

    });

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

      idSessionFormation: SessionFormation.idSessionFormation,
      /* idFormation: SessionFormation.themeDeFormation.nomFormation, */

      //idFormation: SessionFormation.themeDeFormation.nomFormation,

      typeFormation: SessionFormation.typeFormation,

      localFormation: SessionFormation.localFormation,
      description: SessionFormation.description,


      
      codeFormateur: SessionFormation.formateur.codeFormateur,




      dateDebut: SessionFormation.dateDebut,
      nbrHeures: SessionFormation.nbrHeures,
      //file:SessionFormation.data,
      idFormation: SessionFormation.themeDeFormation.idFormation,

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


    /*  this.editForm.value.themeDeFormation = this.themeDeFormations.find(ThemeDeFormation => ThemeDeFormation.idFormation == this.idTh); */
    //this.editForm.value.codeFormateur = this.formateurs.find(formateur => formateur.codeFormateur == this.codeFormateur); 
    console.log(this.editForm.value.codeFormateur);
    console.log(this.editForm.value.idFormation);

    /* console.log('formateurs:', this.formateurs); */
    this.SessionFormationService.updateSessionFormation(this.themeDeFormations, this.formateurs, this.editForm.value, this.selectedFile, this.editForm.value.codeFormateur,this.editForm.value.idFormation).subscribe(response => {
      //console.log(response);

      window.location.reload();


      /* this.ngOnInit(); */
})



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
    this.deleteId = SessionFormation.idSessionFormation;
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
  }
  onDelete(SessionFormation: SessionFormation) {
    this.SessionFormationService.deleteSessionFormation(this.deleteId).subscribe(response => {
      console.log(response);

      this.ngOnInit();
    })

    this.modalService.hide(); //dismiss the modal
  }



}


