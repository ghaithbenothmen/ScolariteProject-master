import { Component } from '@angular/core';
import { Etablissement } from 'src/app/entities/etablissement.model';
import { AuthService } from 'src/app/services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { ImageService } from 'src/app/services/image.service';
@Component({
  selector: 'app-formateur-layout',
  templateUrl: './formateur-layout.component.html',
  styleUrls: ['./formateur-layout.component.css']
})
export class FormateurLayoutComponent {
  public etablissements!: Etablissement[];
  imageData!:any;
  constructor(public authService: AuthService, public etabService : EtablissementService,private imageService: ImageService) { }


}
