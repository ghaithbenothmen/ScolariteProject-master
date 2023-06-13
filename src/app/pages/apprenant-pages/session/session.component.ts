import { Component } from '@angular/core';
//import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InscriptionService } from 'src/app/services/inscription.service';
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
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Inscription } from 'src/app/entities/inscription.model';
import { SeanceService } from 'src/app/services/seance.service';
import { seance } from 'src/app/entities/seance.model';
@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['../../auth-pages/affichagesession-de-formation/affichagesession-de-formation.component.css']
})
export class SessionComponent {

public items = ['En ligne', 'Présentiel'];
  public modalRef!: BsModalRef;
  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public themeDeFormations!: ThemeDeFormation[];
  public themeDeFormation!: ThemeDeFormation;
  public Inscriptions!: Inscription[];
  public Inscription!: Inscription;
  public formateurs!: Formateur[];
  public formateur!: Formateur;
  public seances!: seance[];

  public idFormation!: number;
  public codeFormateur!: number;
  isButtonDisabled: boolean = true;
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
    
public isCollapsed = true;
id: any;
  day!: number;
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  noDataAvailable!: boolean;
  filteredSessions!: SessionFormation[];
  selectedTheme: number | null = null;

  //SessionFormationService: any;




  constructor(private seanceService: SeanceService, private InscriptionService: InscriptionService, private router: Router, private modalService: BsModalService, private datePipe: DatePipe, private fb: FormBuilder, public formateurService: formateurService, public SessionFormationService: SessionFormationService, public ThemeDeFormationService: ThemeDeFormationService, private authService: AuthService) { }
  
  onSelect(sessionFormation :SessionFormation) {
    this.router.navigate(['/user-dashboard/inscri', sessionFormation.idSessionFormation]);
  }
  getSessionFormationn() {
    this.SessionFormationService.getSessionFormation().subscribe((response: any[]) => {
      
      this.sessionFormations = response.sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());//filtrer avec date 
      console.log(response);
  
      response.forEach((item) => {
        const date = new Date(item.dateDebut);
        const dayOfWeek = date.getDay(); 
        item.dayOfWeek = this.getDayName(dayOfWeek);
        item.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy') ?? "";
  
        const dateF = new Date(item.dateFin);
        item.dateFin = this.datePipe.transform(dateF, 'dd MMMM yyyy') ?? "";
        console.log("hrlllloooo",item.idSessionFormation);
        // Associate seances with the sessionFormation

        this.seanceService.getSeance().subscribe(response => {
     
          item.seances= response.filter(seance => seance.sessionFormation.idSessionFormation === item.idSessionFormation);
          //this.seances = response;
          console.log("seances", item.seances,item.idSessionFormation);
          //this.numberOfSession = response.length;
        });

        //this.seances = response.filter(seance => seance.sessionFormation.idSessionFormation === item.idSessionFormation);
        //console.log("hrllo",this.seances);
      });
    
      this.sessionFormations = response;
      this.filteredSessions = this.sessionFormations;
      if (response.length === 0) {
        this.noDataAvailable = true;
      } else {
        this.noDataAvailable = false;
      }
    });
    this.ThemeDeFormationService.getThemeDeFormation().subscribe(response => {
      console.log(response);

      this.themeDeFormations = response;

    });
   
  }
  
  
  getInsecription() {

    this.InscriptionService.getInscription().subscribe((response:any[]) => {
      console.log(response);

      
      this.Inscriptions = response;
     

    });


  }
  
  getDayName(dayOfWeek: number): string {
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
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



    



  ngOnInit(): void {
    this.filterSessions();
   this.getInsecription();
    this.getSessionFormationn();
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

  }


 


  
  


}



