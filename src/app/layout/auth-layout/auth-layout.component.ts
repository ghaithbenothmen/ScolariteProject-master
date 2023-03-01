import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.authService.loadToken();
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

   onLogout() {
    this.authService.logout();
 
}
}