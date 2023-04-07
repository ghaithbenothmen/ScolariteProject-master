import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Etablissement } from 'src/app/entities/etablissement.model';
import { AuthService } from 'src/app/services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-apprenant-layout',
  templateUrl: './apprenant-layout.component.html',
  styleUrls: ['./apprenant-layout.component.css']
})
export class ApprenantLayoutComponent {
  public etablissements!: Etablissement[];
  imageData!:any;
  constructor(public authService: AuthService,private router: Router, public etabService : EtablissementService,private imageService: ImageService) { }

}
