
import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Etablissement } from 'src/app/entities/etablissement.model';
import { AuthService } from 'src/app/services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-side-for',
  templateUrl: './side-for.component.html',
  styleUrls: ['./side-for.component.css','../../components/navbar/navbar.component.css']
})
export class SideForComponent  {
  @Input() bgColor!: String;
  @Input() color!: String;

  constructor(public authService: AuthService,private router: Router,public etabService : EtablissementService,private imageService: ImageService) { }


  public imageData:any;
  public nomEtablissement!:string;
  public etablissements!:Etablissement[];

  
  ngOnInit(): void {
    this.authService.loadToken();

    
    this.router.events.subscribe((event) => {
   
/****************Logo ******************* */
      this.imageService.getImage().subscribe(response => {
        console.log(response);
       
        this.etablissements = response;
        });
    
   });
  }
}
