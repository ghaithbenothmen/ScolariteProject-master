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
@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css']
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
  selectedCheckboxes: any[] = [];
  constructor( private InscriptionService :  InscriptionService, private seanceService :SeanceService ,private modalService: BsModalService,  private fb: FormBuilder, public SessionFormationService: SessionFormationService,  private authService: AuthService) { }
 
 
 
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
      console.log(response);

      this.seances = response;

    });
    
    this.InscriptionService.getInscription().subscribe((response: any[]) => {

      console.log("llll",response);
      this.Inscriptions = response;
      
    })
  }
  
 onCheckboxChange() {
    const selectedOptions = this.Inscriptions.filter(Inscription => Inscription.apprenant.id);
     this.selectedCheckboxes =selectedOptions.filter(Inscription=> Inscription.apprenant.id);
    console.log(this.selectedCheckboxes);
  }

  onSubmit(f: NgForm) {

    this.ngOnInit();
    f.value.sessionFormation= this.sessionFormations.find(sessionFormation => sessionFormation.idSessionFormation == this.idTh);
    //f.value.formateur = this.formateurs.find(formateur => formateur.id == this.idFormateur);

console.log("hhhhh", this.selectedCheckboxes);
    this.seanceService.addSeance(f.value, this.selectedFile,this.selectedCheckboxes).subscribe(response => {

      
      
      this.ngOnInit();

    })

    this.modalService.hide(); //dismiss the modal
  }


  ngOnInit(): void {

    this.getSeance();
    console.log(this.authService.getToken());

    this.editForm = this.fb.group({


idSeanceFormation:[''],
      idSessionFormation: [''],
      contenu: [''],
      date: [''],
      heuresDebut: [''],
      local: [''],
    nbrHeures:[''],



    })

    this.seanceService.getSeance().subscribe(seances => {

      this.SessionFormationService.getSessionFormation().subscribe(foreignKeys => {
        this.seances = seances.map(example => {
          const foreignKey = foreignKeys.find(fk => fk.idSessionFormation === example.idSessionFormation);

          return { ...example, foreignKey };



        });

      });
      
      // this.ThemeDeFormationService.getThemeDeFormation().subscribe(foreignKeys => {
      //   this.sessionFormations = sessionFormations.map(example => {
      //     const foreignKeyTh = foreignKeys.find(fk => fk.idFormation === example.idFormation);

      //     return { ...example, foreignKeyTh };



      //   });

      // });

    });

  /*   this.f = this.fb.group({
      codeFormateur: [null]
    }); */

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
      heuresDebut: seance.heuresDebut,
      local: seance.local,
      nbrHeures: seance.nbrHeures,
      
      
    });

  }

  onSave() {


    // this.editForm.value.idSessionFormation= this.sessionFormations.find(sessionFormation => sessionFormation.idSessionFormation ==  this.editForm.value.idSessionFormation);
  //this.editForm.value.codeFormateur = this.formateurs.find(formateur => formateur.codeFormateur == this.codeFormateur); 
   
   // console.log('foreeeeef', this.editForm.value.idSessionFormation)
   
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


}
