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
    verified:false,
    archive:false,
    nom:'',
    prenom:'',
    tel:''
 
  };
  
  err: number = 0;
  err2: number = 0;
  err3: number = 0;
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
        this.user.archive = user.archive;
        this.user.nom = user.nom;
        this.user.prenom = user.prenom;
        this.user.tel = user.tel;

        console.log('User object:', user.tel);
        if (this.user.verified  ) {             // Check if user is verified
          if(!this.user.archive){
            this.authService.saveToken(token, this.user.role, this.user.id);
            const isAdmin = this.authService.isAdmin();
            const isApp = this.authService.isApp();
    
            console.log('Is admin:', isAdmin);
            if (isAdmin) {
              this.router.navigate(['/admin-dashboard/admin-dash']);
            } else if (isApp) {
              this.router.navigate(['/user-dashboard/dash-app']);
            } else {
              this.router.navigate(['/formateur-dashboard/dash-for']);
            }
          }else{
            this.err3 = 1;
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