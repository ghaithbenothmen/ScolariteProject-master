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
@Component({
  selector: 'app-session-form',
  templateUrl: './session-form.component.html',
  styleUrls: ['./session-form.component.css','../../auth-pages/affichagesession-de-formation/affichagesession-de-formation.component.css']
})
export class SessionFormComponent {
  constructor(  private datePipe: DatePipe,  private router:Router, private fb: FormBuilder, public formateurService: formateurService, public SessionFormationService: SessionFormationService, public ThemeDeFormationService: ThemeDeFormationService, private authService: AuthService) { }

  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public themeDeFormations!: ThemeDeFormation[];
  public themeDeFormation!: ThemeDeFormation;
  public formateurs!: Formateur[];
  public formateur!: Formateur;
  public UserId!:  string | null;
  public idUser!: number;

  
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

     this.SessionFormationService.getSessionFormation().subscribe((response:any[]) => {
      console.log(response);

       response.forEach((item) => {
        const date=new Date(item.dateDebut);
        
        
        const dayOfWeek = date.getDay(); 
        item.dayOfWeek = this.getDayName(dayOfWeek);

      item.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy')??"";
      

      const dateF=new Date(item.dateFin);
      item.dateFin = this.datePipe.transform(dateF, 'dd MMMM yyyy')??"";
       });
       

   
       this.sessionFormations = response.filter(inscri => inscri.formateur.id === this.idUser); //nafsha f html 
     
      console.log("dddd",this.sessionFormations);

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


  getDayName(dayOfWeek: number): string {
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }


  



  ngOnInit(): void {
    this.UserId = localStorage.getItem('UserId');
    this.idUser=Number(this.UserId)

   console.log(this.idUser)
    

    this.getSessionFormation();
    
  }

}