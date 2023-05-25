import { Component, TemplateRef } from '@angular/core';

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
  styleUrls: ['../inscription/inscription.component.css']
})
export class SessionInseritComponent {
  public deleteStatusMessage!: string;
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
 idSession: any;
  //SessionFormationService: any;




  constructor( private route: ActivatedRoute, private InscriptionService :  InscriptionService  ,private router:Router ,private modalService: BsModalService,private datePipe: DatePipe, 
     private fb: FormBuilder, public formateurService: formateurService, public SessionFormationService: SessionFormationService,
     public ThemeDeFormationService: ThemeDeFormationService, private authService: AuthService) { }

  onSelect(sessionFormation :SessionFormation) {
    this.router.navigate(['/user-dashboard/Seance-app', sessionFormation.idSessionFormation]);
  }
  
  
  getInsecription() {

    this.InscriptionService.getInscription().subscribe((response:any[]) => {

     


       response.forEach((item) => {
        const date=new Date(item.sessionFormation.dateDebut);
        
        
        const dayOfWeek = date.getDay(); 
        item.sessionFormation.dayOfWeek = this.getDayName(dayOfWeek);

      item.sessionFormation.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy')??"";
      

      const dateF=new Date(item.sessionFormation.dateFin);
      item.sessionFormation.dateFin = this.datePipe.transform(dateF, 'dd MMMM yyyy')??"";
       });
       
       this.Inscriptions = response.filter(inscri => inscri.apprenant.id === this.idUser); //nafsha f html 
       console.log(this.Inscriptions)
      
     

    });


  }
  
  getDayName(dayOfWeek: number): string {
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }
  





    



  ngOnInit(): void {
    this.idSession = this.route.snapshot.params["id"];
  

    this.UserId = localStorage.getItem('UserId');
    this.idUser=Number(this.UserId)
   this.getInsecription();
   console.log(this.idUser)
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

  openDelete(modalTemplate: TemplateRef<any>, Inscription:Inscription) {
    this.deleteId = Inscription.codeInscription
        this.modalRef = this.modalService.show(modalTemplate,
          {
            class: 'modal-dialogue-centered modal-md',
            backdrop: 'static',
            keyboard: true
          }
        );
  }

  onDelete(Inscription: Inscription) {
    this.InscriptionService.deleteInsc(this.deleteId).subscribe(response => {
     console.log(response);
     this.deleteStatusMessage = 'Vous-etes désinscrit de la session !';
     this.ngOnInit();})
  
   this.modalService.hide(); //dismiss the modal
   } 
 


  
  


}



