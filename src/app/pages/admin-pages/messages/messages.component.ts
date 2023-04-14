import { ContactService } from './../../../services/contact.service';
import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Contact } from 'src/app/entities/contact.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  public modalRef!: BsModalRef;
  private deleteId !: number;
  public contacts!:Contact[];
  public contact!:Contact;

  constructor(private modalService: BsModalService, private httpClient: HttpClient, public contService : ContactService) { }
  

  ngOnInit(): void {
    
    this.getContact();

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


  getContact() {
    this.contService.getContact().subscribe(response => {
      console.log(response);
      this.contacts = response;
    });
  }

openDelete(modalTemplate: TemplateRef<any>, contact: Contact) {
  this.deleteId=contact.idContact;
      this.modalRef = this.modalService.show(modalTemplate,
        {
          class: 'modal-dialogue-centered modal-md',
          backdrop: 'static',
          keyboard: true
        }
      );
}
 onDelete(contact : Contact) {
   this.contService.supprimerCon(this.deleteId).subscribe(response => {
    console.log(response);
    
    this.ngOnInit();})
 
  this.modalService.hide(); //dismiss the modal
  } 
  
  
}
