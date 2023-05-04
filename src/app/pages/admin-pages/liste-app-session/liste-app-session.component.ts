import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { UserService } from '../../../services/user.service';
import { ApprenantService } from '../../../services/apprenant.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Inscription } from 'src/app/entities/inscription.model';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-liste-app-session',
  templateUrl: './liste-app-session.component.html',
  styleUrls: ['./liste-app-session.component.css']
})
   
  
export class ListeAppSessionComponent {


  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
   public apprenants!: Apprenant[];
  public apprenant!: Apprenant;
    public Inscriptions!: Inscription[];
  public Inscription!: Inscription;
    public UserId!:  string | null;
 public idUser!: number;
  idSession: any;
 constructor(private InscriptionService :  InscriptionService ,private route:ActivatedRoute ,private datePipe: DatePipe,   
    private appService: ApprenantService, private authService: AuthService) { }
  //Pagination//
 
  getApprenants() {
    this.appService.getApprenants().subscribe(response => {
      console.log(response);
      this.apprenants = response;
    });
  }

  getInsecription() {

    this.InscriptionService.getInscription().subscribe((response:any[]) => {

      console.log(response);


       response.forEach((item) => {
        const date=new Date(item.sessionFormation.dateDebut);
        
        
        const dayOfWeek = date.getDay(); 
        item.sessionFormation.dayOfWeek = this.getDayName(dayOfWeek);

      item.sessionFormation.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy')??"";
      

      const dateF=new Date(item.sessionFormation.dateFin);
      item.sessionFormation.dateFin = this.datePipe.transform(dateF, 'dd MMMM yyyy')??"";
       });
       
      
      this.Inscriptions = response;
     

    });


  }
  
  ngOnInit(): void {
    this.idSession = this.route.snapshot.params["id"];
    console.log('ddd',this.idSession);
        this.UserId = localStorage.getItem('UserId');
    this.idUser=Number(this.UserId)
   this.getInsecription();
    this.getApprenants();
    console.log(this.authService.getToken())
  }

  getDayName(dayOfWeek: number): string {
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }
}