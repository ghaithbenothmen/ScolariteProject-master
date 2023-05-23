import { ThemeDeFormationService } from './../../services/theme-de-formation.service';
import { Actualite } from './../../entities/actualite.model';
import { Component } from '@angular/core';
import { Etablissement } from '../../entities/etablissement.model';
import { EtablissementService } from '../../services/etablissement.service';
import { ActualiteService } from 'src/app/services/actualite.service';
import { DatePipe } from '@angular/common';
import { ThemeDeFormation } from 'src/app/entities/ThemeDeFormation.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['../navbar/navbar.component.css']
})
export class FooterComponent {

  public etablissements!: Etablissement[];
  public etablissement!: Etablissement;
public Actualites !:Actualite[];
public Actualite !:Actualite;
public ThemeFormations !:ThemeDeFormation[];
public ThemeFormation !:ThemeDeFormation;
  
  constructor(private themeFor : ThemeDeFormationService , private datePipe: DatePipe,public etabService : EtablissementService  ,public actualiteService  : ActualiteService) { }
 

  getActualite() {
    this.actualiteService.getActualite().subscribe((response:any[]) => {
      console.log(response);
      
      response.forEach((item) => {
        const date=new Date(item.dateActualite);
        

        const dayOfWeek = date.getDay(); 
        item.dayOfWeek = this.getDayName(dayOfWeek);

        item.dateActualite = this.datePipe.transform(date, 'dd MMMM yyyy')??"";
        
      });
      
      this.Actualites = response;
     
      });
  }

  getTheme(){

    this.themeFor.getThemeDeFormationn().subscribe(response => {
      console.log(response);
     
      this.ThemeFormations = response;
      });
  }
  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const formattedHours = hours.padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }
  
  getDayName(dayOfWeek: number): string {
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }
  

  getEtablissement() {
    this.etabService.getEtablissements().subscribe(response => {
      console.log(response);
     
      this.etablissements = response;
      });
  }

  ngOnInit(): void {
    this.getEtablissement();
    this.getActualite();
    this.getTheme();
    console.log(this.Actualites);
  }
}
