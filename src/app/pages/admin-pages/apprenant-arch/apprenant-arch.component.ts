import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { AuthService } from 'src/app/services/auth.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-apprenant-arch',
  templateUrl: './apprenant-arch.component.html',
  styleUrls: ['./apprenant-arch.component.css']
})
export class ApprenantArchComponent {
  public showForm1: boolean = false;
  public form1!: FormGroup;
  public form2!: FormGroup;
  public items = ['Eleve', 'Etudiant', "Demandeur_emploie", 'Professionel'];

 
  public selectedItem!: number;

  [x: string]: any;
  public modalRef!: BsModalRef;
  public apprenants!: Apprenant[];
  public apprenantsApp!: Apprenant[];
  public apprenant!: Apprenant;
  public editForm!: FormGroup;
  public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public message2!: string;
  public ajoutForm!: FormGroup;  //variable peut etre null on ajoute 
  selectedValue: any = null;
  public numberOfApprenants!: number;
  public numberOfApprenantsAff!: number;
  errorMessage!: string;
  successMessage!:string;
  public noDataAvailable !: boolean;

  constructor(private userSer: UserService, private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,
    private appService: ApprenantService, private authService: AuthService) { }
    
    
    //Pagination//
    page:number=1;
    count:number=0;
    tableSize:number=3;
    onTableChange(event:any){
      this.page=event;
      this.getApprenants();

    }



  ngOnInit(): void {

    
    this.getApprenants();
    console.log(this.authService.getToken())

    this.editForm = this.fb.group({
      id: [''],

      nom: [''],
      prenom: [''],
      /* sexeApprenant: [''], */
      dateNaissanceApprenant: [''],
      emailApprenant: [''],
      tel: [''],
      adresseApprenant: [''],
      archive: [''],
      sexeApprenant: [''],
      niveauApprenant: [''],
      qualiteApprenant: [null],
      
      password: [''],
      email: ['']

    })

    this.editForm2 = this.fb.group({
      id: [''],

      nom: [''],
      prenom: [''],
      /* sexeApprenant: [''], */
      dateNaissanceApprenant: [''],
      emailApprenant: [''],
      telApprenant: [''],
      adresse: [''],
      archive: [''],
      sexeApprenant: [''],
      niveauApprenant: [''],
      qualiteApprenant: [''],
      
      password: [''],
      email: ['']



    })
  }

  getApprenants() {
    this.appService.getApprenants().subscribe(response => {
      this.apprenants = response.filter(app => app.archive ===true); //nafsha f html 
      this.apprenantsApp = response.filter(app => app.archive ===false); //nafsha f html 

      console.log( this.apprenants );

       
        this.numberOfApprenantsAff=this.apprenantsApp.length;
          this.numberOfApprenants=this.apprenants.length;

          if (this.apprenants.length === 0) {
            this.noDataAvailable = true;
          } else {
            this.noDataAvailable = false;
          }

      
      
    });
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
  onSubmit(f: NgForm) {

    this.appService.ajoutApp(f.value).subscribe(
      (response) => {
        // Inscription saved successfully
        // Do any additional actions here if needed
        this.errorMessage = '';
        this.successMessage = 'Apprenant bien ajouté .';
      },
      (error) => {
        // Error occurred
        console.error('Error saving apprenant:', error);
        this.errorMessage = 'Apprenant non ajouté veuillez verifier votre formulaire.';
        this.successMessage = '';
      })

    this.modalService.hide(); //dismiss the modal
  }

  openDetails(modalTemplate: TemplateRef<any>, apprenant: Apprenant) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({
      id: apprenant.id,

      nom: apprenant.nom,
      prenom: apprenant.prenom,
      sexeApprenant: apprenant.sexeApprenant,
      dateNaissanceApprenant: apprenant.dateNaissanceApprenant,

      emailApprenant: apprenant.email,

      tel: apprenant.tel,
      adresse: apprenant.adresse,
      archive: apprenant.archive,
      userame: apprenant.nom + "." + apprenant.prenom,
      password:'',

      email: apprenant.email,

      qualiteApprenant: apprenant.qualiteApprenant,
      niveauApprenant: apprenant.niveauApprenant,


    });


  }

  onSave() {
console.log("id",this.editForm.value.id);
    this.appService.updateApp(this.editForm.value).subscribe(response => {
      console.log(response);

      
      this.ngOnInit();
    })

    this.modalService.hide(); //dismiss the modal
  }

  onPatch() {
    this.appService.supprimerApp(this.editForm2.value).subscribe(() => {
      //console.log(this.editForm2.value.idApprenant);
      console.log("app supprimé");
      this.ngOnInit();
    });
    this.modalService.hide();
    console.log(this.editForm2.value.id)
  }

  onPatchArch() {
    this.appService.desArchiveApp(this.editForm2.value).subscribe(() => {
      //console.log(this.editForm2.value.idApprenant);
      console.log("app supprimé");
      this.ngOnInit();
    });
    this.modalService.hide();
    console.log(this.editForm2.value.id)
  }


  openDelete(modalTemplate: TemplateRef<any>, apprenant: Apprenant) {
    this.deleteId = apprenant.id;
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm2.patchValue({
      id: apprenant.id,

      nom: apprenant.nom,
      prenom: apprenant.prenom,
      sexeApprenant: apprenant.sexeApprenant,
      dateNaissanceApprenant: apprenant.dateNaissanceApprenant,

      emailApprenant: apprenant.email,

      tel: apprenant.tel,
      adresse: apprenant.adresse,
      archiveApprenant: apprenant.archive,
     userame: apprenant.nom + "." + apprenant.prenom,
      password:apprenant.password,

      email: apprenant.email,

      qualiteApprenant: apprenant.qualiteApprenant,
      niveauApprenant: apprenant.niveauApprenant,


    });


  }
  onLogin() {
    this.userSer.addUser(this.editForm.value).subscribe(response => {
      console.log(response);

      this.ngOnInit();
    })

    this.modalService.hide(); //dismiss the modal
  }

  onDelete(App: Apprenant) {
    this.appService.deleteApp(this.deleteId).subscribe(response => {
     console.log(response);
     this.ngOnInit();})
  
   this.modalService.hide(); //dismiss the modal
   } 


}
