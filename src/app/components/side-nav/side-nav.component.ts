
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Etablissement } from 'src/app/entities/etablissement.model';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { ImageService } from 'src/app/services/image.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{
  public imageData:any;
  public nomEtablissement!:string;
  public etablissements!:Etablissement[];
 

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService,private router: Router,public etabService : EtablissementService,private imageService: ImageService) { }

  reload(){
    window.location.reload()
  }
  ngOnInit(): void {
    this.authService.loadToken();

   
    this.router.events.subscribe((event) => {
      
/****************Logo ******************* */
      this.imageService.getImage().subscribe(response => {
        console.log(response);
       
        this.etablissements = response;
        });
    
   });

 /*   const activeItem = localStorage.getItem('activeItem'); 

   // Check if activeItem exists in localStorage
   if (activeItem) {
     // Set the value of activeItem in your component
     this.setActiveItem(Number(activeItem));
   } */
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

    onLogout() {
    this.authService.logout();
  }

  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }

  /**************mettre li active**************/
 /*  activeItem: number = 1;

  setActiveItem(item: number) {
    localStorage.setItem('activeItem', String(item));
    this.activeItem = item;
  } */
  /*******************************************/
/*   public menuItems!: any[];
  public isCollapsed = true; */

  


}
