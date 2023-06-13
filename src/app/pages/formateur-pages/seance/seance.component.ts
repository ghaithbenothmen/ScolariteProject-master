import { Apprenant } from 'src/app/entities/apprenant.model';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { Inscription } from 'src/app/entities/inscription.model';
import { seance } from 'src/app/entities/seance.model';
import { AuthService } from 'src/app/services/auth.service';
import { SeanceService } from 'src/app/services/seance.service';
import { SessionFormationService } from 'src/app/services/session-formation.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Language {
  id: number;
  name: string;
  checked: boolean;
}
@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css', '../../admin-pages/apprenant/apprenant.component.css']
})
export class SeanceComponent {
  public modalRef!: BsModalRef;
  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  
  public seances!: seance[];
  public seance!: seance;

  public idFormation!: number;
  public codeFormateur!: number;
  public f !:NgForm;
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
 public Inscriptions!: Inscription[];
  public Inscription!: Inscription;
  apprenant: any;
  selectedCheckboxes: number[] = [];

   public UserId!:  string | null;
 public idUser!: number;
  idSession: any;
public lengthInscri!:number;
public noDataAvailable !: boolean;
public seanceID!:number;


  constructor(private router: Router,private route:ActivatedRoute , private InscriptionService :  InscriptionService, private seanceService :SeanceService ,private modalService: BsModalService,  private fb: FormBuilder, public SessionFormationService: SessionFormationService,  private authService: AuthService) { }
 
 
 
  public onFileChanged(event: any) {

    this.selectedFile = event.target.files[0];


  }
 
 
  


   //Pagination//
   page:number=1;
   count:number=0;
   tableSize:number=3;
   onTableChange(event:any){
     this.page=event;
   //  this.getSessionFormation();

   }

  getSeance() {

    this.SessionFormationService.getSessionFormation().subscribe(response => {
      console.log(response);

      this.sessionFormations = response;

    });
    this.seanceService.getSeance().subscribe(response => {
      
      this.lengthInscri = 0;
      this.seances = response.filter(seance=>seance.sessionFormation.idSessionFormation==this.idSession);//nafsha html
      
      console.log("seances",this.seances);
      


      for(let seance of response){
        if(seance.sessionFormation.idSessionFormation == this.idSession){
          this.lengthInscri++;

      }
    }
    if (this.lengthInscri === 0) {
      this.noDataAvailable = true;
    } else {
      this.noDataAvailable = false;
    }
    
    console.log(this.lengthInscri)
    });
    
    this.InscriptionService.getInscription().subscribe((response: any[]) => {

      //console.log("llll",response);
      this.Inscriptions = response;
     
      
   /*    for(let inscri of this.Inscriptions){
        if(inscri.sessionFormation.idSessionFormation == this.idSession){
          this.lengthInscri=response.length;
          console.log("longhey",inscri.sessionFormation.idSessionFormation);
      }
    } */
      this.setInitialCheckboxValues();

    })
  }
  
  setInitialCheckboxValues() {//initialiser id 
    for (let inscription of this.Inscriptions) {
      inscription.apprenant.id = 0; 
      console.log('null or not',inscription.apprenant.id)
    }
  }

  onCheckboxChange() {
    this.selectedCheckboxes = this.Inscriptions
      .filter(Inscription => Inscription.apprenant.id)
      .map(Inscription => Inscription.codeInscription);
    console.log("grtgrt",this.selectedCheckboxes);
  }


  onSubmit(f: NgForm) {
    this.ngOnInit();
    
    const sessionFormation = this.sessionFormations.find(session => session.idSessionFormation == this.idSession);
    f.value.sessionFormation = sessionFormation;
    
    console.log("hhhhh", this.selectedCheckboxes);
    
    this.seanceService.addSeance(f.value, this.selectedFile).subscribe(
      seanceResponse => {
        console.log("Seance added successfully:", seanceResponse);

        const seanceId = seanceResponse.idSeanceFormation;

       // const inscriptionIds = [ 23,25]; 

        this.seanceService.addInscriptionsToSeance(seanceId, this.selectedCheckboxes).subscribe(
          inscriptionsResponse => {
            console.log("Inscriptions added successfully:", inscriptionsResponse);
            this.ngOnInit();
            this.modalService.hide(); // Dismiss the modal
          },
          inscriptionsError => {
            console.log("Error adding inscriptions:", inscriptionsError);
            // Handle error scenario for adding inscriptions
          }
        );
      },
      seanceError => {
        console.log("Error adding seance:", seanceError);
        // Handle error scenario for adding seance
      }
    );
  }

  showSeanceDetails(seanceId: number): void {
   
    this.router.navigate(['formateur-dashboard/seance-details', seanceId]);

  }

  ngOnInit(): void {
    
    this.idSession = this.route.snapshot.params["id"];
    console.log('ddd',this.idSession);

    this.getSeance();
    console.log(this.authService.getToken());

    this.editForm = this.fb.group({


      idSeanceFormation:[''],
      idSessionFormation: [''],
      contenu: [''],
      date: [''],
      heureDebut: [''],
      local: [''],
      nbrHeures:[''],



    })

  /*   this.seanceService.getSeance().subscribe(seances => {

      this.SessionFormationService.getSessionFormation().subscribe(foreignKeys => {
        this.seances = seances.map(example => {
          const foreignKey = foreignKeys.find(fk => fk.idSessionFormation === example.idSessionFormation);

          return { ...example, foreignKey };



        });

      });
      
  

    });
 */

  }



  /************************ pop up****************** */
  openDetails(modalTemplate: TemplateRef<any>, seance: seance) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({
      
      idSeanceFormation:seance.idSeanceFormation,
      idSessionFormation: seance.sessionFormation.idSessionFormation,
      contenu: seance.contenu,
      date: seance.date,
      heureDebut: seance.heureDebut,
      local: seance.local,
      nbrHeures: seance.nbrHeures,
      
      
    });

  }

  onSave() {

   
    this.seanceService.updateSeance( this.editForm.value, this.selectedFile).subscribe(response => {
      //console.log(response);

      window.location.reload();


      /* this.ngOnInit(); */
})



    this.modalService.hide(); //dismiss the modal
  }


  openModal(modalTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
  }


/***************************contoller ************** */

  onControl(f: NgForm) {
    if (f.valid) {
      this.message = 'Seance bien ajouté !';
    }
    if (f.invalid) {
      this.message = 'Seance non ajoué ! Verifier votre formulaire !';
    }
  }


  /**********************Template delete ******************* */
  openDelete(modalTemplate: TemplateRef<any>, seance: seance) {
    this.deleteId = seance.idSeanceFormation;
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
  }
  onDelete(seance: seance) {
    this.seanceService.deleteSeance(this.deleteId).subscribe(response => {
      console.log(response);

      this.ngOnInit();
    })

    this.modalService.hide(); //dismiss the modal
  }


  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const formattedHours = hours.padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  languages: Language[] = [
    { id: 1, name: 'English', checked: false },
    { id: 2, name: 'Spanish', checked: false },
    { id: 3, name: 'French', checked: false },
    { id: 4, name: 'German', checked: false },
    { id: 5, name: 'Chinese', checked: false }
  ];

  selectAll(checked: boolean): void {
    this.languages.forEach(language => (language.checked = checked));
  }

  toggleCheckbox(language: Language): void {
    language.checked = !language.checked;
  }
  
}
