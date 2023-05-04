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
  selector: 'app-apprenant',
  templateUrl: './apprenant.component.html',
  styleUrls: ['./apprenant.component.css']
})
export class ApprenantComponent {
  public showForm1: boolean = false;
  public form1!: FormGroup;
  public form2!: FormGroup;
  public items = ['Eleve', 'Etudiant', "demandeur  d'emploie", 'Professionel'];

  public selectedItem!: number;

  [x: string]: any;
  public modalRef!: BsModalRef;
  public apprenants!: Apprenant[];
  public apprenant!: Apprenant;
  public editForm!: FormGroup;
  public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public message2!: string;
  public ajoutForm!: FormGroup;  //variable peut etre null on ajoute 
  public apiURL: string = "http://localhost:8080/apprenant/api";


  

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

      nomApprenant: [''],
      prenomApprenant: [''],
      /* sexeApprenant: [''], */
      dateNaissanceApprenant: [''],
      emailApprenant: [''],
      telApprenant: [''],
      adresseApprenant: [''],
      archiveApprenant: [''],
      sexeApprenant: [''],
      niveauApprenant: [''],
      qualiteApprenant: [''],
      userame: [''],
      password: [''],
      email: ['']

    })

    this.editForm2 = this.fb.group({
      id: [''],
      nomApprenant: [''],
      prenomApprenant: [''],
      /* sexeApprenant: [''], */
      dateNaissanceApprenant: [''],
      emailApprenant: [''],
      password:[''],
      telApprenant: [''],
      adresseApprenant: [''],
      archiveApprenant: [''],



    })
  }

  getApprenants() {
    this.appService.getApprenants().subscribe(response => {
      console.log(response);
      this.apprenants = response;
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

    this.appService.ajoutApp(f.value).subscribe(response => {
      console.log(response);
      this.ngOnInit();
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
    /*   document.getElementById('codeApprenant')?.setAttribute('value', (apprenant.codeApprenant).toString());
      document.getElementById('nomApprenant')?.setAttribute('value', apprenant.nomApprenant);
      document.getElementById('prenomApprenant')?.setAttribute('value', apprenant.prenomApprenant);
      
      document.getElementById('sexeApprenant')?.setAttribute('value', apprenant.sexeApprenant);
      document.getElementById('dateNaissanceApprenant')?.setAttribute('value', (apprenant.dateNaissanceApprenant).toString());
      document.getElementById('emailApprenant')?.setAttribute('value', apprenant.emailApprenant);
      document.getElementById('telApprenant')?.setAttribute('value', (apprenant.telApprenant).toString());
      document.getElementById('adresseApprenant')?.setAttribute('value', apprenant.adresseApprenant);
      document.getElementById('archiveApprenant')?.setAttribute('value', (apprenant.archiveApprenant).toString()); */


    this.editForm.patchValue({
      id: apprenant.id,

      nomApprenant: apprenant.nomApprenant,
      prenomApprenant: apprenant.prenomApprenant,
      sexeApprenant: apprenant.sexeApprenant,
      dateNaissanceApprenant: apprenant.dateNaissanceApprenant,
      emailApprenant: apprenant.email,
      telApprenant: apprenant.telApprenant,
      adresseApprenant: apprenant.adresseApprenant,
      archiveApprenant: apprenant.archiveApprenant,
      userame: apprenant.nomApprenant + "." + apprenant.prenomApprenant,
      password: apprenant.dateNaissanceApprenant,
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
      console.log("produit supprimé");
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
      nomApprenant: apprenant.nomApprenant,
      prenomApprenant: apprenant.prenomApprenant,
      sexeApprenant: apprenant.sexeApprenant,
      dateNaissanceApprenant: apprenant.dateNaissanceApprenant,
      emailApprenant: apprenant.email,
      telApprenant: apprenant.telApprenant,
      adresseApprenant: apprenant.adresseApprenant,
      archiveApprenant: apprenant.archiveApprenant,


    });


  }
  onLogin() {
    this.userSer.addUser(this.editForm.value).subscribe(response => {
      console.log(response);

      this.ngOnInit();
    })

    this.modalService.hide(); //dismiss the modal
  }

  /************************************ les controllers **************************************************/

  onControl(f: NgForm) {
    if (!f.errors) {
      this.message = 'Apprenant bien ajouté !';
    }
    if (f.errors) {
      this.message2 = 'Apprenant non ajoué ! Verifier votre formulaire !';
    }
  }

  switchForms() {
    this.showForm1 = !this.showForm1;
    if (this.showForm1) {
      // Enable controls for form 1
      this.form1.enable();
      // Disable controls for form 2
      this.form2.disable();
    } else {
      // Enable controls for form 2
      this.form2.enable();
      // Disable controls for form 1
      this.form1.disable();
    }
  }
}


