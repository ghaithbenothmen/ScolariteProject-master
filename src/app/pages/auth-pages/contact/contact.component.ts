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
  errorMessage!: string;
  successMessage!:string;

  constructor( private contService: ContactService,private etabService : EtablissementService) { }

  public etablissements!: Etablissement[];
  public etablissement!: Etablissement;


  getEtablissement() {
    this.etabService.getEtablissements().subscribe(response => {
      
     
      this.etablissements = response;
      });
  }

  onSubmit (f: NgForm) {
  
    
    this.contService.ajoutCon(f.value).subscribe(
      response => {
        
        console.log(response);
        this.errorMessage = '';
        this.successMessage = 'Votre message a été bien envoyé.';
        this.ngOnInit();
      },
      error => {
        console.error('Error saving inscription:', error);
        this.errorMessage = 'Vérifiez le formulaire.';
        this.successMessage = '';
        this.ngOnInit();
      }
    )
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
