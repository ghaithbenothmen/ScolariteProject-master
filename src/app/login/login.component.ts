import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Component } from '@angular/core';
import { User } from '../entities/user.model';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements CanActivate{
  user = new User();
  err:number = 0;


  constructor(private router:Router,private authService : AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }
  onLoggedin() {
   
    this.authService.login(this.user).subscribe((res:any)=> {
      
      
      /* let jwToken = headers.get('Authorization')!;*/
      this.authService.saveToken(res.token); 
      //localStorage.setItem('token',res.token)
      //this.token = res.token;
      this.router.navigate(['/apprenant']); 
      /* console.log(jwToken); */
    },(erreur)=>{ this.err = 1;}
      );
    }
      //si on a erreur on ajout 1 a err

      
}
