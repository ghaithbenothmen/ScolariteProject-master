import { UserService } from './../../services/user.service';
import { Role } from './../../entities/role.model';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../../entities/user.model';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //user = new User();

  message!: string;

  user: User = {
id:0,
    email:'',
    password: '',
    role: Role.User, // Set default role value to empty string
    verified:false
  };
  
  err: number = 0;
  err2: number = 0;

  constructor(private router: Router, private authService: AuthService,private userService : UserService) { }



  ngOnInit(): void {

    this.message = history.state.message;
   /*  this.userService.getUser().subscribe((userD: any) => {
      this.user = {
        userame: userD.userame,
        email: userD.email,
        password: userD.password,
        role: userD.role 
      };
    }); */

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/accueil']);
    }
  }

  onLoggedin() {
    this.authService.login(this.user).subscribe((res: any) => {
      const token = res.token;
      this.authService.getUserByEmail(this.user.email).subscribe((user: User) => {
        this.user.role = user.role;
        this.user.id = user.id;
        this.user.verified = user.verified;
        
        console.log('User object:', user.verified);
        if (this.user.verified) { // Check if user is verified
          this.authService.saveToken(token, this.user.role, this.user.id);
          const isAdmin = this.authService.isAdmin();
          const isApp = this.authService.isApp();
  
          console.log('Is admin:', isAdmin);
          if (isAdmin) {
            this.router.navigate(['/admin-dashboard/admin-dash']);
          } else if (isApp) {
            this.router.navigate(['/user-dashboard/ListeSession']);
          } else {
            this.router.navigate(['/formateur-dashboard']);
          }
        } else {
          this.err2 = 1; // User is not verified, set err2 to display error message
        }
      }, (erreur) => {
        this.err = 1;
      });
    }, (erreur) => {
      this.err = 1;
    });
  }
  
}