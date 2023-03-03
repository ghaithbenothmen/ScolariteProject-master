import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Etablissement } from 'src/app/entities/etablissement.model';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { EtablissementService } from 'src/app/services/etablissement.service';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/apprenant', title: 'apprenant',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/etablissement', title: 'etablissement',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/login', title: 'login', icon: 'ni-tv-2 text-primary', class: '' },
   { path: '/departement', title: 'departement',  icon: 'ni-tv-2 text-primary', class: '' },
];

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit{


 

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService,private router: Router,public etabService : EtablissementService) { }

  ngOnInit(): void {
    this.authService.loadToken();

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
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
