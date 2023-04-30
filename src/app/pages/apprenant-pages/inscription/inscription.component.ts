import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ThemeDeFormation } from 'src/app/entities/ThemeDeFormation.model';
import { ThemeDeFormationService } from 'src/app/services/theme-de-formation.service';
import { AuthService } from 'src/app/services/auth.service';

import { SessionFormationService } from 'src/app/services/session-formation.service';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { formateurService } from 'src/app/services/formateur.service';
import { Formateur } from 'src/app/entities/formateur.model';


import { DatePipe } from '@angular/common';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Apprenant } from '../../../entities/apprenant.model';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { Inscription } from 'src/app/entities/inscription.model';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

public items = ['En ligne', 'Présentiel'];
  public modalRef!: BsModalRef;
  public apprenants!: Apprenant[];

  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public inscriptions!: Inscription[];
  public inscription!: Inscription;
  public apprenant!:Apprenant;

  public idFormation!: number;
  public codeFormateur!: number;
  public idS!: number;
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
   public dateDebut !: string;
  public id !: number;
public isCollapsed = true;
  public UserId !: string | null;

  //SessionFormationService: any;




  constructor(private appService:ApprenantService, private route:ActivatedRoute ,private modalService: BsModalService,private datePipe: DatePipe,  private fb: FormBuilder, public formateurService: formateurService,public InscriptionService:InscriptionService, public SessionFormationService: SessionFormationService, public ThemeDeFormationService: ThemeDeFormationService, private authService: AuthService) { }
  

  getApprenants() {
    this.appService.getApprenants().subscribe(response => {
      console.log(response);
      this.apprenants = response;
    });
  }


 /*  getSessionFormationn() {

    this.InscriptionService.getInscription().subscribe(response => {
      //console.log(response);

      this.inscriptions = response;

    });
    this.appService.getApprenants().subscribe(response => {
      console.log(response);

      this.apprenants = response;

    });
    


  } */

  getSessionFormationn() {

    this.SessionFormationService.getSessionFormation().subscribe((response:any[]) => {
      //console.log(response);

       response.forEach((item) => {
        const date=new Date(item.dateDebut)
        const day=new Date(item.dateDebut).getDay();

      item.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy')??"";

      });
      response.forEach((item) => {
        const date=new Date(item.dateFin)
        const day=new Date(item.dateDebut).getDay();

      item.dateFin = this.datePipe.transform(date, 'dd MMMM yyyy')??"";

      });
      this.sessionFormations = response;


    });
this.appService.getApprenants().subscribe(response => {
      console.log(response);

      this.apprenants = response;

    });

    this.SessionFormationService.getSessionFormation().subscribe(response => {
      console.log(response);

      this.sessionFormations = response;

    });

  }

  


onControl(f: NgForm) {
    if (f.valid) {
      this.message = 'Actualite bien ajouté !';
    }
    if (f.invalid) {
      this.message = 'Actualite non ajoué ! Verifier votre formulaire !';
    }
}
  

/*  onSubmit(f: NgForm) {

    this.ngOnInit();
   // f.value.themeDeFormation = this.themeDeFormations.find(ThemeDeFormation => ThemeDeFormation.idFormation == this.idTh);
   // f.value.formateur = this.formateurs.find(formateur => formateur.id == this.idFormateur);


    this.SessionFormationService.addSessionFormation(f.value, this.selectedFile).subscribe(response => {

      console.log(response);
      window.location.reload();
      this.ngOnInit();

    })

    this.modalService.hide(); //dismiss the modal
  } */

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

      idUser:this.UserId


    });

  }
 onSave() {

  /* const selectedApprenant = this.apprenants.find(apprenant => apprenant.id == this.editForm.value.idUser);
  const selectedSession = this.sessionFormations.find(sessionFormation => sessionFormation.idSessionFormation == this.editForm.value.idSessionFormation);
  console.log("hi",selectedApprenant) */
  // this.editForm.value.themeDeFormation = this.themeDeFormations.find(ThemeDeFormation => ThemeDeFormation.idFormation == this.idTh); */
   // this.editForm.value.codeFormateur = this.formateurs.find(formateur => formateur.codeFormateur == this.codeFormateur); 
   /*  console.log(this.editForm.value.idUser);
   console.log(this.editForm.value.idSessionFormation); */

   console.log("edit",this.editForm.value)
    /* this.editForm.value.sessionFormation = this.editForm.value.idSessionFormation

   this.editForm.value.Apprenant = this.editForm.value.idUser  */
    console.log("app",this.apprenants);
    /* console.log('formateurs:', this.formateurs); */
    
    this.InscriptionService.addInsecription(this.apprenants, /* selectedApprenant */this.editForm.value, this.editForm.value.idUser).subscribe(response => {
      //response.apprenant = selectedApprenant
      /* response.apprenant = this.editForm.value.Apprenant;
      response.SesionDeFormation = this.editForm.value.sessionFormation; */
      console.log("eee", response); 
     ;
      


      /* this.ngOnInit(); */
})

    

    this.modalService.hide(); //dismiss the modal
  }
  /***************************contoller ************** */


openModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
  }

  ngOnInit(): void {
 

    //this.id=this.route.snapshot.paramMap.get("id");
    this.id = this.route.snapshot.params["id"];

    this.UserId = localStorage.getItem('UserId');
    console.log("lklk",this.UserId);
    this.getSessionFormationn();

    console.log(this.authService.getToken());
 //console.log(this.sessionFormations.)
      ;
    
      this.editForm = this.fb.group({

      
      
      idSessionFormation: [''],
     idUser: [''],
  

    })

  }


 


  
  


}






