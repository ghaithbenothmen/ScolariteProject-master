import { ImageService } from 'src/app/services/image.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Etablissement } from 'src/app/entities/etablissement.model';
import { AuthService } from 'src/app/services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
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
    
/****************Logo ******************* */
this.imageService.getImage().subscribe(response => {
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

/*   getInfo() {
    this.etabService.getInfo().subscribe(response => {
      console.log(response);
     
      this.etablissements = response;
      });
  } */
 


}