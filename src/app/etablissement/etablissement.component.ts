import { Etablissement } from './../entities/etablissement.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Apprenant } from '../entities/apprenant.model';
import { AuthService } from '../services/auth.service';
import { EtablissementService } from '../services/etablissement.service';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit{
  public modalRef!: BsModalRef;
  public etablissements!: Etablissement[];
  public etablissement!: Etablissement;
  public editForm!: FormGroup;
  public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public ajoutForm!:FormGroup ; 

  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,private etabService : EtablissementService,private authService:AuthService) { }
 
  getEtablissement() {
    this.etabService.getApprenants().subscribe(response => {
      console.log(response);
      this.etablissements = response;
      });
}

onSubmit(f: NgForm) {
    
  this.etabService.ajoutEtab(f.value).subscribe(response => {
    console.log(response);
    this.ngOnInit();})
 
  this.modalService.hide(); //dismiss the modal
}

ngOnInit(): void {
  this.getEtablissement();
}



/************************ pop up****************** */

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
    this.message = 'Apprenant bien ajouté !';
  }
  if (f.invalid) {
    this.message = 'Apprenant non ajoué ! Verifier votre formulaire !';
  }
}
}