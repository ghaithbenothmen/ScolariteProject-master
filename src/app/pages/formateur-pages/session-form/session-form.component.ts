import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { ThemeDeFormationService } from 'src/app/services/theme-de-formation.service';
import { AuthService } from 'src/app/services/auth.service';

import { SessionFormationService } from 'src/app/services/session-formation.service';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { formateurService } from 'src/app/services/formateur.service';

import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgFor } from '@angular/common';
import { ThemeDeFormation } from 'src/app/entities/ThemeDeFormation.model';
import { Formateur } from 'src/app/entities/formateur.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SeanceService } from 'src/app/services/seance.service';
import { seance } from 'src/app/entities/seance.model';
@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css','../../auth-pages/affichagesession-de-formation/affichagesession-de-formation.component.css']
})
export class SessionFormComponent {
   noDataAvailable!: boolean;
  tes!: seance[];
  
  idss!: number;
  
  constructor( private seanceService:SeanceService  ,private modalService: BsModalService,  private datePipe: DatePipe,  private router:Router, private fb: FormBuilder, public formateurService: formateurService, public SessionFormationService: SessionFormationService, public ThemeDeFormationService: ThemeDeFormationService, private authService: AuthService) { }
 public modalRef!: BsModalRef;
  public sessionFormations!: SessionFormation[];
  public seances!: seance[];
  public sessionFormation!: SessionFormation;
  public themeDeFormations!: ThemeDeFormation[];
  public themeDeFormation!: ThemeDeFormation;
  public formateurs!: Formateur[];
  public formateur!: Formateur;
  public UserId!:  string | null;
  public idUser!: number;
  private deleteId !: number;
  private legthInscr!:number;
  isButtonDisabled: boolean = true;
  selectedTheme: number | null = null;
  filteredSessions!: SessionFormation[];


  onSelect(sessionFormation :SessionFormation) {
    this.router.navigate(['/formateur-dashboard/Seance-Formation', sessionFormation.idSessionFormation]);
  }
  onSelectApp(sessionFormation :SessionFormation) {
    this.router.navigate(['/formateur-dashboard/apprenant-sess', sessionFormation.idSessionFormation]);
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
    this.seanceService.getSeance().subscribe(response => {
      //this.tes=response.filter(se=>se.sessionFormation.idSessionFormation==)
  response.forEach((item) => {
    this.idss= item.sessionFormation.idSessionFormation;
        
       
       });
      console.log("aaaa",this.idss);

      this.seances = response;
      //this.numberOfSession = response.length;
    });
     

     this.SessionFormationService.getSessionFormation().subscribe((response:any[]) => {

       
       this.sessionFormations = response.sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());//filtrer avec date 
      console.log(response);
      


       response.forEach((item) => {
        const date=new Date(item.dateDebut);
        
        
        const dayOfWeek = date.getDay(); 
        item.dayOfWeek = this.getDayName(dayOfWeek);

      item.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy')??"";
      

      const dateF=new Date(item.dateFin);
      item.dateFin = this.datePipe.transform(dateF, 'dd MMMM yyyy')??"";

      this.seanceService.getSeance().subscribe(response => {
     
        item.seances= response.filter(seance => seance.sessionFormation.idSessionFormation === item.idSessionFormation);
        //this.seances = response;
        console.log("seances", item.seances,item.idSessionFormation);
        
        //this.numberOfSession = response.length;
      });
  
       });
       

   
       this.sessionFormations = response.filter(inscri => inscri.formateur.id === this.idUser); //nafsha f html 
       this.filteredSessions = this.sessionFormations;


      this.legthInscr=this.sessionFormations.length;
       console.log("dddd", this.legthInscr);
       
      if (this.filteredSessions.length === 0) {
        this.noDataAvailable = true;
      } else {
        this.noDataAvailable = false;
      }

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

  AcheverSessionFormation(SessionFormation: SessionFormation) {
    this.SessionFormationService.AcheverSessionFormation(this.deleteId).subscribe(response => {
      console.log(response);

      this.ngOnInit();
    })

    this.modalService.hide(); //dismiss the modal
  }


  
  getDayName(dayOfWeek: number): string {
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }


  



  ngOnInit(): void {
    this.UserId = localStorage.getItem('UserId');
    this.idUser=Number(this.UserId)

   console.log(this.idUser)
    
   this.selectedTheme = null; // filter
    this.getSessionFormation();
    this.filterSessions();
  }


  filterSessions() {
    if (!this.selectedTheme) {
      this.filteredSessions = this.sessionFormations; // No theme selected, show all sessions
      console.log('filter',this.filteredSessions);
    } else {
      this.filteredSessions = this.sessionFormations.filter(session => session.themeDeFormation.idFormation == this.selectedTheme);
      console.log('filter',this.filteredSessions);
    }
  }

}

