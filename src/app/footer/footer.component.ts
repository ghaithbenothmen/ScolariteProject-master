import { Component } from '@angular/core';
import { Etablissement } from '../entities/etablissement.model';
import { EtablissementService } from '../services/etablissement.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public etablissements!: Etablissement[];
  public etablissement!: Etablissement;

  
  constructor( public etabService : EtablissementService) { }
 
  getEtablissement() {
    this.etabService.getEtablissements().subscribe(response => {
      console.log(response);
     
      this.etablissements = response;
      });
  }

  ngOnInit(): void {
    this.getEtablissement();
  }
}
