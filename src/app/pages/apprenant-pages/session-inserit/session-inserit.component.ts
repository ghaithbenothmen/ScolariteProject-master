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
@Component({
  selector: 'app-session-inserit',
  templateUrl: './session-inserit.component.html',
  styleUrls: ['./session-inserit.component.css']
})
export class SessionInseritComponent {

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

  public idFormation!: number;
  public codeFormateur!: number;

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
  public UserId!:  string | null;
 public idUser!: number;
  
  //SessionFormationService: any;




  constructor( private InscriptionService :  InscriptionService  ,private router:Router ,private modalService: BsModalService,private datePipe: DatePipe,  private fb: FormBuilder, public formateurService: formateurService, public SessionFormationService: SessionFormationService, public ThemeDeFormationService: ThemeDeFormationService, private authService: AuthService) { }

  
  
  getInsecription() {

    this.InscriptionService.getInscription().subscribe((response:any[]) => {
      console.log("hhhh",response);

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
  
  getDayName(dayOfWeek: number): string {
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }
  





    



  ngOnInit(): void {


    this.UserId = localStorage.getItem('UserId');
    this.idUser=Number(this.UserId)
   this.getInsecription();
   
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



