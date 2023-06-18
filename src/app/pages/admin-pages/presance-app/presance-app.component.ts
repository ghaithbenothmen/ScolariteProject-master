import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { Inscription } from 'src/app/entities/inscription.model';
import { seance } from 'src/app/entities/seance.model';
import { SeanceService } from 'src/app/services/seance.service';
import { SessionFormationService } from 'src/app/services/session-formation.service';

@Component({
  selector: 'app-presance-app',
  templateUrl: './presance-app.component.html',
  styleUrls: ['./presance-app.component.css']
})
export class PresanceAppComponent {


  constructor(
    private route: ActivatedRoute,
    private seanceService: SeanceService,
    public SessionFormationService: SessionFormationService,
    
  ) { }
  public lengthInscri!:number;
  public seance!: seance;
  public noDataAvailable !: boolean;
  public apprenant!:Apprenant;
  public apprenants!:Apprenant[];
  public seances!:seance[];
  public Inscriptions!: Inscription[];
  public Inscription!: Inscription;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const seanceId = +params['id'];
      this.getSeanceDetails(seanceId);
    });
  }

  getSeanceDetails(seanceId: number): void {
    this.seanceService.getSeanceById(seanceId).subscribe(response => {
    console.log(response)
      this.seance = response;
      

      this.Inscriptions=this.seance.inscription;
      this.lengthInscri=this.Inscriptions.length;
      console.log('inscr',this.Inscriptions)
      /*this.seance.inscription.forEach(inscription => {
            //console.log(inscription.codeInscription); // Access the inscription ID
            console.log(inscription.apprenant); // Access other properties of the apprenant object
            this.apprenant=inscription.apprenant;
            console.log("app",this.apprenant)

    });*/
         if (this.lengthInscri === 0) {
      this.noDataAvailable = true;
    } else {
      this.noDataAvailable = false;
    }
  });
  }
  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const formattedHours = hours.padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

 
    
  
}