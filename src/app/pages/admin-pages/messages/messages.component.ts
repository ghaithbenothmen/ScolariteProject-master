import { ContactService } from './../../../services/contact.service';
import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Contact } from 'src/app/entities/contact.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css','../apprenant/apprenant.component.css']
})
export class MessagesComponent {
  public modalRef!: BsModalRef;
  private deleteId !: number;
  public contacts!:Contact[];
  public contact!:Contact;
public numberMess!:number;
public noDataAvailable !: boolean;

  constructor(private modalService: BsModalService, private httpClient: HttpClient, public contService : ContactService) { }
   //Pagination//
   page:number=1;
   count:number=0;
   tableSize:number=3;
   onTableChange(event:any){
     this.page=event;
     this.getContact();

   }


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
    
      this.contacts = response;
      this.numberMess=response.length;
      if (response.length === 0) {
        this.noDataAvailable = true;
      } else {
        this.noDataAvailable = false;
      }
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
