import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Etablissement } from 'src/app/entities/etablissement.model';
import { AuthService } from 'src/app/services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';
import { ImageService } from 'src/app/services/image.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  
     { path: '/ListeSession', title: 'ListeSession', icon: 'ni-tv-2 text-primary', class: '' },
   
];
@Component({
  selector: 'app-side-app',
  templateUrl: './side-app.component.html',
  styleUrls: ['./side-app.component.css']
})
export class SideAppComponent {
  public imageData:any;
  public nomEtablissement!:string;
  public etablissements!:Etablissement[];
 

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService,private router: Router,public etabService : EtablissementService,private imageService: ImageService) { }

  ngOnInit(): void {
    this.authService.loadToken();

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
/****************Logo ******************* */
      this.imageService.getImage().subscribe(response => {
        console.log(response);
       
        this.etablissements = response;
        });
    
   });
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
  activeItem: number = 1;

  setActiveItem(item: number) {
    this.activeItem = item;
  }
  /****************************************** */
  public menuItems!: any[];
  public isCollapsed = true;

  

}
