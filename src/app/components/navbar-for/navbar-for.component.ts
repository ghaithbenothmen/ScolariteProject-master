import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-for',
  templateUrl: './navbar-for.component.html',
  styleUrls: ['./navbar-for.component.css']
})
export class NavbarForComponent {
  @Input() bg:any;
  @Input() color: any;
  btnStyle:any
  constructor(public authService: AuthService,) { }

  ngOnInit(): void {
    this.btnStyle = `color: ${this.color}`
  }

  onLogout() {
    this.authService.logout();
  }
}
