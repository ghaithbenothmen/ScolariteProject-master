import { Inscription } from './../../../entities/inscription.model';
import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { UserService } from '../../../services/user.service';
import { ApprenantService } from '../../../services/apprenant.service';
import { SessionFormationService } from 'src/app/services/session-formation.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InscriptionService } from 'src/app/services/inscription.service';

import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-liste-app-session',
  templateUrl: './liste-app-session.component.html',
  styleUrls: ['../apprenant/apprenant.component.css','./liste-app-session.component.css']
})
   
  
export class ListeAppSessionComponent {
  selectedTheme: number | null = null;
  public modalRef!: BsModalRef;
  private deleteId !: number;
  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
   public apprenants!: Apprenant[];
  public apprenant!: Apprenant;
    public Inscriptions!: Inscription[];
  public Inscription!: Inscription;
    public UserId!:  string | null;
 public idUser!: number;
  idSession: any;
public lengthApp!:number;
public noDataAvailable !: boolean;
public editForm!: FormGroup;
errorMessage!: string;
successMessage!:string;


 constructor(public SessionFormationService: SessionFormationService,private fb: FormBuilder,private modalService: BsModalService,private InscriptionService :  InscriptionService ,private route:ActivatedRoute ,private datePipe: DatePipe,   
    private appService: ApprenantService, private authService: AuthService) { }
  //Pagination//
 
  getApprenants() {
    this.appService.getApprenants().subscribe(response => {
      this.lengthApp=0;

      console.log(response);
      this.apprenants = response;

  
    });
  }

  
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

  getInsecription() {

    this.InscriptionService.getInscription().subscribe((response:any[]) => {
      this.lengthApp=0;
      


       response.forEach((item) => {
        const date=new Date(item.sessionFormation.dateDebut);
        
        
        const dayOfWeek = date.getDay(); 
        item.sessionFormation.dayOfWeek = this.getDayName(dayOfWeek);

      item.sessionFormation.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy')??"";
      

      const dateF=new Date(item.sessionFormation.dateFin);
      item.sessionFormation.dateFin = this.datePipe.transform(dateF, 'dd MMMM yyyy')??"";
       });
       
      
      this.Inscriptions = response;
     
      for (let inscri of this.Inscriptions) {
        if (inscri.sessionFormation.idSessionFormation== this.idSession) {
      
        this.lengthApp++;
     
        
        }
        
      }

      if (this.lengthApp === 0) {
        this.noDataAvailable = true;
      } else {
        this.noDataAvailable = false;
      }

    });


  }

  
  ngOnInit(): void {
    this.idSession = this.route.snapshot.params["id"];
    console.log('ddd',this.idSession);
        this.UserId = localStorage.getItem('UserId');
    this.idUser=Number(this.UserId)
   this.getInsecription();
    this.getApprenants();
    console.log(this.authService.getToken());

    this.editForm = this.fb.group({

      
      
      sessionFormation: [''],
      apprenant: [''],


  })

  }

  getDayName(dayOfWeek: number): string {
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }

  openDelete(modalTemplate: TemplateRef<any>, Inscription:Inscription) {
    this.deleteId = Inscription.codeInscription
        this.modalRef = this.modalService.show(modalTemplate,
          {
            class: 'modal-dialogue-centered modal-md',
            backdrop: 'static',
            keyboard: true
          }
        );
  }

  onDelete(Inscription: Inscription) {
    this.InscriptionService.deleteInsc(this.deleteId).subscribe(response => {
     console.log(response);
     this.ngOnInit();})
  
   this.modalService.hide(); //dismiss the modal
   } 

   openDetails(modalTemplate: TemplateRef<any>, SessionFormation: SessionFormation) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({

      sessionFormation: SessionFormation.idSessionFormation,
      /* idFormation: SessionFormation.themeDeFormation.nomFormation, */

      //idFormation: SessionFormation.themeDeFormation.nomFormation,

      apprenant:this.UserId

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

 
    this.Inscriptions=this.editForm.value;
  
     console.log("ins",this.editForm.value.sessionFormation );
    
     
     this.InscriptionService.addInsecription(this.editForm.value.sessionFormation  ,  this.editForm.value.apprenant  ,  this.editForm.value).subscribe(
       (response: Inscription) => {
        console.log('fggg',response)
         // Inscription saved successfully
         // Do any additional actions here if needed
         this.errorMessage = '';
         this.successMessage = 'Apprenant bien inscri .';
       },
       (error) => {
         // Error occurred
         console.error('Error saving inscription:', error);

         this.errorMessage = 'apprenant deja inscri .';
         this.successMessage = '';
       }
     );
 
     
 this.ngOnInit();
     this.modalService.hide(); //dismiss the modal
   }
}