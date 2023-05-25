import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  selector: 'app-apprenant-sess',
  templateUrl: './apprenant-sess.component.html',
  styleUrls: ['../../admin-pages/apprenant/apprenant.component.css', './apprenant-sess.component.css']
})
export class ApprenantSessComponent {
  public modalRef!: BsModalRef;
  private deleteId !: number;
  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public apprenants!: Apprenant[];
  public apprenant!: Apprenant;
  public Inscriptions!: Inscription[];
  public Inscription!: Inscription;
  public UserId!: string | null;
  public idUser!: number;
  idSession: any;

  public lengthApp!:number;
public noDataAvailable !: boolean;


  constructor(private modalService: BsModalService, private InscriptionService: InscriptionService, private route: ActivatedRoute, private datePipe: DatePipe,
    private appService: ApprenantService, private authService: AuthService) { }
  //Pagination//

  getApprenants() {
    this.appService.getApprenants().subscribe(response => {
      console.log(response);
      this.apprenants = response;

     

    });
  }
  getInsecription() {

    this.InscriptionService.getInscription().subscribe((response: any[]) => {
this.lengthApp=0;

      console.log(response);


      response.forEach((item) => {
        const date = new Date(item.sessionFormation.dateDebut);


        const dayOfWeek = date.getDay();
        item.sessionFormation.dayOfWeek = this.getDayName(dayOfWeek);

        item.sessionFormation.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy') ?? "";


        const dateF = new Date(item.sessionFormation.dateFin);
        item.sessionFormation.dateFin = this.datePipe.transform(dateF, 'dd MMMM yyyy') ?? "";
      });


      this.Inscriptions = response;
      for (let inscri of this.Inscriptions) {
        if (inscri.sessionFormation.idSessionFormation== this.idSession) {
      
        this.lengthApp++;
        }
        
      }
      console.log('hey', this.lengthApp)

      if (this.lengthApp === 0) {
        this.noDataAvailable = true;
      } else {
        this.noDataAvailable = false;
      }
    });
  

  }

  ngOnInit(): void {
    this.idSession = this.route.snapshot.params["id"];
    console.log('ddd', this.idSession);
    this.UserId = localStorage.getItem('UserId');
    this.idUser = Number(this.UserId)
    this.getInsecription();
    this.getApprenants();
    console.log(this.authService.getToken())
  }

  getDayName(dayOfWeek: number): string {

    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }
}
