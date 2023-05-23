import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { ThemeDeFormation } from 'src/app/entities/ThemeDeFormation.model';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { Formateur } from 'src/app/entities/formateur.model';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { formateurService } from 'src/app/services/formateur.service';
import { ThemeDeFormationService } from 'src/app/services/theme-de-formation.service';
import { SessionFormationService } from 'src/app/services/session-formation.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css','../../../layout/admin-layout/admin-layout.component.css']
})
export class AdminDashComponent {
  

  constructor( public SessionFormationService: SessionFormationService, private formateurService  : formateurService , private appService: ApprenantService,public themeDeFormationService : ThemeDeFormationService) { }
  
  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public ThemeDeFormation!: ThemeDeFormation[];
  public themeDeFormation!: ThemeDeFormation;
  public formateur!:  Formateur [];
  public Formateur!:  Formateur ;
    public apprenants!: Apprenant[];
    public apprenant!: Apprenant;

    public numberOfApprenants!: number;
    public numberOfFormateurs!: number;
    public numberOfThemes!: number;
    public numberOfSession!: number;

    ngOnInit(): void {

      this.getApprenants();
      this.getFormateur();
      this.getThemeDeFormation();
      this.getSessionFormation();
    }

    getApprenants() {
      this.appService.getApprenants().subscribe(response => {
        console.log(response);
        this.apprenants = response;
        this.numberOfApprenants=response.length;
      });
    }
    
    getFormateur() {
      this.formateurService.getFormateur().subscribe(response => {
        console.log(response);
       
        this.formateur = response;
        this.numberOfFormateurs=response.length;
  
  
        });
    }

    getThemeDeFormation() {
      this.themeDeFormationService.getThemeDeFormation().subscribe(response => {
        console.log(response);
       
        this.ThemeDeFormation = response;
      this.numberOfThemes=response.length;
        });
    }

    getSessionFormation() {

      this.SessionFormationService.getSessionFormation().subscribe(response => {
        console.log(response);
  
        this.sessionFormations = response;
        this.numberOfSession=response.length;

    });
  }
}