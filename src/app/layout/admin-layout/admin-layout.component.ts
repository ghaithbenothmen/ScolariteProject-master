import { Etablissement } from './../../entities/etablissement.model';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})


export class AdminLayoutComponent {
  public etablissements!: Etablissement[];
  constructor(public authService: AuthService,private router: Router, public etabService : EtablissementService) { }


  getInfo() {
    this.etabService.getInfo().subscribe(response => {
      console.log(response);
     
      this.etablissements = response;
      });
  }
}
