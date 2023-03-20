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
  user:User = {
    userame: '',
    email:'',
    password: '',
    role: Role.User // Set default role value to empty string
  };
  
  err: number = 0;


  constructor(private router: Router, private authService: AuthService,private userService : UserService) { }



  ngOnInit(): void {
   /*  this.userService.getUser().subscribe((userD: any) => {
      this.user = {
        userame: userD.userame,
        email: userD.email,
        password: userD.password,
        role: userD.role 
      };
    }); */
  }

  onLoggedin() {

    this.authService.login(this.user).subscribe((res: any) => {
      const token = res.token;

      this.authService.getUserByEmail(this.user.email).subscribe((user: User) => {
       this.user.role =user.role;
       this.user.userame=user.userame;
       
      console.log('User object:', this.user);
      this.authService.saveToken(token,this.user.role);

      const isAdmin = this.authService.isAdmin(); // Call isAdmin() function
      console.log('Is admin:', isAdmin);

      if (isAdmin) {
        
        this.router.navigate(['/apprenant']);
      } else {
        this.router.navigate(['/etablissement']);
      }


    }, (erreur) => { this.err = 1; } );

  },(erreur) => {
    console.log('Error:', erreur);
  });

  //si on a erreur on ajout 1 a err
  }
}