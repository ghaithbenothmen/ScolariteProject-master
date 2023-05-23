import { EtablissementService } from './../../../services/etablissement.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/entities/contact.model';
import { Etablissement } from 'src/app/entities/etablissement.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  public message:any;
  public contacts !:Contact[];

  constructor( private contService: ContactService,private etabService : EtablissementService) { }

  public etablissements!: Etablissement[];
  public etablissement!: Etablissement;


  getEtablissement() {
    this.etabService.getEtablissements().subscribe(response => {
      console.log(response);
     
      this.etablissements = response;
      });
  }

  onSubmit (f: NgForm) {
  
    
    this.contService.ajoutCon(f.value).subscribe(response => {
      console.log(response);
       })
       window.location.reload();
  
  }


  onControl(f: NgForm) {
    if (f.valid) {
      this.message = 'votre message est bien envoyée !';
    }
    if (f.invalid) {
      this.message = 'votre message non  envoyée !';
    }
  }

  ngOnInit(): void {
    this.getEtablissement();
  }
}
