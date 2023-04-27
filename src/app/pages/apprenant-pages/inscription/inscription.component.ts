import { Component, TemplateRef } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ThemeDeFormation } from 'src/app/entities/ThemeDeFormation.model';
import { ThemeDeFormationService } from 'src/app/services/theme-de-formation.service';
import { AuthService } from 'src/app/services/auth.service';

import { SessionFormationService } from 'src/app/services/session-formation.service';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { formateurService } from 'src/app/services/formateur.service';
import { Formateur } from 'src/app/entities/formateur.model';


import { DatePipe } from '@angular/common';
import { InscriptionService } from 'src/app/services/inscription.service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {

public items = ['En ligne', 'Présentiel'];
  public modalRef!: BsModalRef;
  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public inscriptionServices!: InscriptionService[];
  public inscriptionService!: InscriptionService;
  

  public idFormation!: number;
  public codeFormateur!: number;
  public idS!: number;
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
   public dateDebut !: string;
  public id !: number;
public isCollapsed = true;
  public UserId !: string | null;

  //SessionFormationService: any;




  constructor( private route:ActivatedRoute ,private modalService: BsModalService,private datePipe: DatePipe,  private fb: FormBuilder, public formateurService: formateurService, public SessionFormationService: SessionFormationService, public ThemeDeFormationService: ThemeDeFormationService, private authService: AuthService) { }
  
  getSessionFormationn() {

    this.SessionFormationService.getSessionFormation().subscribe((response:any[]) => {
      //console.log(response);

       response.forEach((item) => {
        const date=new Date(item.dateDebut)
        const day=new Date(item.dateDebut).getDay();

      item.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy')??"";

      });
      response.forEach((item) => {
        const date=new Date(item.dateFin)
        const day=new Date(item.dateDebut).getDay();

      item.dateFin = this.datePipe.transform(date, 'dd MMMM yyyy')??"";

      });
      this.sessionFormations = response;


    });


  }

  


onControl(f: NgForm) {
    if (f.valid) {
      this.message = 'Actualite bien ajouté !';
    }
    if (f.invalid) {
      this.message = 'Actualite non ajoué ! Verifier votre formulaire !';
    }
}
  

 onSubmit(f: NgForm) {

    this.ngOnInit();
   // f.value.themeDeFormation = this.themeDeFormations.find(ThemeDeFormation => ThemeDeFormation.idFormation == this.idTh);
   // f.value.formateur = this.formateurs.find(formateur => formateur.id == this.idFormateur);


    this.SessionFormationService.addSessionFormation(f.value, this.selectedFile).subscribe(response => {

      console.log(response);
      window.location.reload();
      this.ngOnInit();

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

  ngOnInit(): void {
 

    //this.id=this.route.snapshot.paramMap.get("id");
    this.id = this.route.snapshot.params["id"];
    this.UserId = localStorage.getItem('Userid');
    console.log(this.UserId);
    this.getSessionFormationn();
    console.log(this.authService.getToken());
 console.log("llk",this.id)
      ;
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






