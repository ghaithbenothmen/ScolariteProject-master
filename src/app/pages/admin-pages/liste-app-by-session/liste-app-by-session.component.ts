
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
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-liste-app-by-session',
  templateUrl: './liste-app-by-session.component.html',
  styleUrls: ['./liste-app-by-session.component.css']
})
export class ListeAppBySessionComponent {
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
  public f !:NgForm;
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

   //Pagination//
   page:number=1;
   count:number=0;
   tableSize:number=3;
   onTableChange(event:any){
     this.page=event;
     this.getSessionFormation();

   }

  getSessionFormation() {

    this.SessionFormationService.getSessionFormation().subscribe(response => {
      console.log("dddd",response);

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
       dateFin: [''],
      nbrHeures: [''],


      file: [''],





    })

    

  
      
      
   

  /*   this.f = this.fb.group({
      codeFormateur: [null]
    }); */

  }


  /************************ pop up****************** */
  


  
  onSave() {


    /*  this.editForm.value.themeDeFormation = this.themeDeFormations.find(ThemeDeFormation => ThemeDeFormation.idFormation == this.idTh); */
    //this.editForm.value.codeFormateur = this.formateurs.find(formateur => formateur.codeFormateur == this.codeFormateur); 
    console.log(this.editForm.value.codeFormateur);
    console.log(this.editForm.value.idFormation);

    console.log('foreeeee',this.formateurs)
    /* console.log('formateurs:', this.formateurs); */
    this.SessionFormationService.updateSessionFormation(this.themeDeFormations, this.formateurs, this.editForm.value, this.selectedFile, this.editForm.value.codeFormateur,this.editForm.value.idFormation).subscribe(response => {
      //console.log(response);

     // window.location.reload();


      /* this.ngOnInit(); */
})



    this.modalService.hide(); //dismiss the modal
  }
  /***************************contoller ************** */

 


  /**********************Template delete ******************* */
  
  



}



