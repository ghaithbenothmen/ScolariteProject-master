import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
