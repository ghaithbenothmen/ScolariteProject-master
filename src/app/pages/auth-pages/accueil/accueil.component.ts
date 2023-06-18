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
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SeanceService } from 'src/app/services/seance.service';
import { seance } from 'src/app/entities/seance.model';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css','../../../components/navbar/navbar.component.css']
})
export class AccueilComponent {


  
  filteredSessions!: SessionFormation[]; // Variable to store the filtered sessions
  selectedTheme: number | null = null;

  public items = ['En ligne', 'Présentiel'];
  public modalRef!: BsModalRef;
  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public themeDeFormations!: ThemeDeFormation[];
  public themeDeFormation!: ThemeDeFormation;
  public formateurs!: Formateur[];
  public formateur!: Formateur;

  


  public editForm!: FormGroup;
  // public editForm2!: FormGroup;
 
  public message!: string;
  public ajoutForm!: FormGroup;
  selectedFile: any;
  Data!: Blob;
  dbimage: any;
  idFormateur: any;
  idTh: any;
  public seances!: seance[];
  public dateDebut !: string;

  public isCollapsed = true;
  id: any;
  day!: number;
  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //SessionFormationService: any;




  constructor(private seanceService: SeanceService,private router: Router, private datePipe: DatePipe, private fb: FormBuilder, public formateurService: formateurService, public SessionFormationService: SessionFormationService, public ThemeDeFormationService: ThemeDeFormationService, private authService: AuthService) { }
  onSelect(sessionFormation: SessionFormation) {
    this.router.navigate(['/user-dashboard/inscri', sessionFormation.idSessionFormation]);
  }
  getSessionFormationn() {
     this.seanceService.getSeance().subscribe(response => {
      console.log(response);

      this.seances = response;
      //this.numberOfSession = response.length;
    });

    this.SessionFormationService.getSessionFormation().subscribe((response: any[]) => {
      
      //filtrer les donnés avec date descendant
      this.sessionFormations = response.sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());
  

      console.log(response);

      response.forEach((item) => {
        const date = new Date(item.dateDebut);


        const dayOfWeek = date.getDay();
        item.dayOfWeek = this.getDayName(dayOfWeek);

        item.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy') ?? "";


        const dateF = new Date(item.dateFin);
        item.dateFin = this.datePipe.transform(dateF, 'dd MMMM yyyy') ?? "";
      });


      this.sessionFormations = response;
      this.filteredSessions = this.sessionFormations;

    });


  }


  getDayName(dayOfWeek: number): string {

    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }


  getTheme() {
    this.ThemeDeFormationService.getThemeDeFormationn().subscribe((response: any[]) => {
      this.themeDeFormations = response;
    });
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
    this.selectedTheme = null; // filter
    this.filterSessions();
    this.getTheme();
    


    this.getSessionFormationn();
    console.log('hhh',this.sessionFormations);


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



