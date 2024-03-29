import { AuthService } from './services/auth.service';

import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import * as Popper from 'popper.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'firstProject';

  constructor(public authService: AuthService,private router: Router) { }
 

  ngOnInit(): void {
    this.authService.loadToken();
  if(this.authService.isTokenExpired()){
    localStorage.removeItem('token');
    
  }
    
    /* this.authService.isloggedIn=true; */
/********************* afficher que la page login pour utilisateur tant qu'il n'est pas connecter**************** */
   /*  if ((this.authService.getToken() == null) || (this.authService.isTokenExpired())){
      
      this.router.navigate(['/']);
      
    } */
  }

  onLogout() {
    this.authService.logout();
  }







}