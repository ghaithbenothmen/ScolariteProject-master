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
  selector: 'app-affichagesession-de-formation',
  templateUrl: './affichagesession-de-formation.component.html',
  styleUrls: ['./affichagesession-de-formation.component.css']
})
export class AffichagesessionDeFormationComponent {

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
  /***********contoller ************** */

  onControl(f: NgForm) {
    if (f.valid) {
      this.message = 'Actualite bien ajouté !';
    }
    if (f.invalid) {
      this.message = 'Actualite non ajoué ! Verifier votre formulaire !';
    }
  }


  


}



