import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { ImageService } from 'src/app/services/image.service';
import { Etablissement } from 'src/app/entities/etablissement.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  public isCollapsed=true;
  public etablissements!: Etablissement[];


  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService,private router: Router,public etabService : EtablissementService,private imageService:ImageService) { }


  ngOnInit(): void {

    

    this.authService.loadToken();
    this.getEtablissement();
    
/****************Logo ******************* */
this.imageService.getImage().subscribe(response => {
  console.log(response);
 
  this.etablissements = response;
  });

    
  }
 

/*   getInfo() {
    this.etabService.getInfo().subscribe(response => {
      console.log(response);
     
      this.etablissements = response;
      });
  } */
  getEtablissement() {
    this.etabService.getEtablissements().subscribe(response => {
      console.log(response);
     
      this.etablissements = response;
      });
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

   onLogout() {
    this.authService.logout();
  }
}
