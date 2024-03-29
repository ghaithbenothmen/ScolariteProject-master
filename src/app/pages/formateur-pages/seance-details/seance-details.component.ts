import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { Inscription } from 'src/app/entities/inscription.model';
import { seance } from 'src/app/entities/seance.model';
import { SeanceService } from 'src/app/services/seance.service';
import { SessionFormationService } from 'src/app/services/session-formation.service';

@Component({
  selector: 'app-seance-details',
  templateUrl: './seance-details.component.html',
  styleUrls: ['./seance-details.component.css']
})
export class SeanceDetailsComponent implements OnInit {
 

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
      console.log('inscr', this.Inscriptions)
       if (this.lengthInscri === 0) {
      this.noDataAvailable = true;
    } else {
      this.noDataAvailable = false;
    }
      /*this.seance.inscription.forEach(inscription => {
            //console.log(inscription.codeInscription); // Access the inscription ID
            console.log(inscription.apprenant); // Access other properties of the apprenant object
            this.apprenant=inscription.apprenant;
            console.log("app",this.apprenant)
    });*/
  });
  }
  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const formattedHours = hours.padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

 
    
  
}