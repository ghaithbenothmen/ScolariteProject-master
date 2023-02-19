import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Apprenant } from '../entities/apprenant.model';
import { ApprenantService } from '../services/apprenant.service';

@Component({
  selector: 'app-apprenant',
  templateUrl: './apprenant.component.html',
  styleUrls: ['./apprenant.component.css']
})
export class ApprenantComponent implements OnInit {
  [x: string]: any;
  public modalRef!: BsModalRef;
  public apprenants!: Apprenant[];
  public apprenant!: Apprenant;
  public editForm!: FormGroup;
  public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public ajoutForm!:FormGroup ;  //variable peut etre null on ajoute 
  public apiURL:string="http://localhost:8080/apprenant/api";


  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,private appService : ApprenantService,private authService:AuthService) { }

  ngOnInit(): void {
    apprenant: Apprenant
    this.getApprenants();
    console.log( this.authService.getToken())

    this.editForm = this.fb.group({
      idApprenant: [''],
      codeApprenant: [''],
      nomApprenant: [''],
      prenomApprenant: [''],
      /* sexeApprenant: [''], */
      dateNaissanceApprenant: [''],
      emailApprenant: [''],
      telApprenant: [''],
      adresseApprenant: [''],
      archiveApprenant: ['']


    })

    this.editForm2 = this.fb.group({
      idApprenant: [''],
      codeApprenant: [''],
      nomApprenant: [''],
      prenomApprenant: [''],
      /* sexeApprenant: [''], */
      dateNaissanceApprenant: [''],
      emailApprenant: [''],
      telApprenant: [''],
      adresseApprenant: [''],
      archiveApprenant: [''],


    })
  }
  /*  patchApprenants(apprenant:Apprenant){
    this.httpClient.patch('http://localhost:8080/apprenant/rest/'+this.deleteId ,apprenant);
   this.modalService.hide();
   this.ngOnInit();
 
   } */

/* loadApprenant(){
  this.appService.getApprenants().subscribe((res:any)=>{
    debugger})
} */

  getApprenants() {
    this.appService.getApprenants().subscribe(response => {
      console.log(response);
      this.apprenants = response;
      });

    /* this.httpClient.get<any>('http://localhost:8080/apprenant/api').subscribe(
      response => {
        console.log(response);
        this.apprenants = response;
      }
    ); */
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
      this.ngOnInit();})
   
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
      idApprenant: apprenant.idApprenant,
      codeApprenant: apprenant.codeApprenant,
      nomApprenant: apprenant.nomApprenant,
      prenomApprenant: apprenant.prenomApprenant,
      sexeApprenant: apprenant.sexeApprenant,
      dateNaissanceApprenant: apprenant.dateNaissanceApprenant,
      emailApprenant: apprenant.emailApprenant,
      telApprenant: apprenant.telApprenant,
      adresseApprenant: apprenant.adresseApprenant,
      archiveApprenant: apprenant.archiveApprenant


    });


  }

  onSave() {
   /*  const editURL = 'http://localhost:8080/apprenant/api/' + this.editForm.value.idApprenant ;
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value)
      .subscribe((results) => {
        this.ngOnInit();

      });
    this.modalService.hide(); */
    
    this.appService.updateApp(this.editForm.value).subscribe(response => {
      console.log(response);
   
      this.ngOnInit();})
   
    this.modalService.hide(); //dismiss the modal
  }

  onPatch() { 
    this.appService.supprimerApp(this.editForm2.value).subscribe(() => {
      //console.log(this.editForm2.value.idApprenant);
    console.log("produit supprimé");
    this.ngOnInit(); });
  
   /*  const editURL = 'http://localhost:8080/apprenant/api/' + this.editForm2.value.idApprenant + '/patch';
    console.log(this.editForm2.value);
    this.httpClient.put(editURL, this.editForm2.value)
      .subscribe((results) => {
        this.ngOnInit();

      }); */
    this.modalService.hide();
  }


  openDelete(modalTemplate: TemplateRef<any>, apprenant: Apprenant) {
this.deleteId=apprenant.idApprenant;
    this.modalRef = this.modalService.show(modalTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm2.patchValue({
      idApprenant: apprenant.idApprenant,
      codeApprenant: apprenant.codeApprenant,
      nomApprenant: apprenant.nomApprenant,
      prenomApprenant: apprenant.prenomApprenant,
      sexeApprenant: apprenant.sexeApprenant,
      dateNaissanceApprenant: apprenant.dateNaissanceApprenant,
      emailApprenant: apprenant.emailApprenant,
      telApprenant: apprenant.telApprenant,
      adresseApprenant: apprenant.adresseApprenant,
      archiveApprenant: apprenant.archiveApprenant


    });


  }

  /* onDelete() {
    const deleteURL = 'http://localhost:8080/apprenant/api/' + this.deleteId + '/delete';
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        
      });
      this.modalService.hide();
  } */

  /************************************ les controllers **************************************************/

  onControl(f: NgForm) {
    if (f.valid) {
      this.message = 'Apprenant bien ajouté !';
    }
    if (f.invalid) {
      this.message = 'Apprenant non ajoué ! Verifier votre formulaire !';
    }
  }
}
export { Apprenant };

