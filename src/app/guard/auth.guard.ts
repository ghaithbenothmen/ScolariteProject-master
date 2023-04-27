import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {

    
 /* 
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true; */

    if (this.authService.isLoggedIn()) {
      // If the user is logged in, check their role
      if (this.authService.isAdmin() ) {
        // If the user is an admin and trying to access the admin dashboard, allow access to the route
        if (state.url === '/admin-dashboard/apprenant') {
          return true;
        } else {
          // If the user is an admin and trying to access the user dashboard, redirect them to the admin dashboard
          this.router.navigate(['/admin-dashboard/apprenant']);
          return false;
        }

      } else if (this.authService.isApp() ) {
        // If the user is a regular user and trying to access the user dashboard, allow access to the route
        if (state.url === '/user-dashboard/ListeSession') {
          return true;
        
        } else {
          // If the user is a regular user and trying to access any other route, allow access to the route
          //this.router.navigate(['/user-dashboard/ListeSession']);
          return true;
        }
      } else {
        // If the user is trying to access a dashboard they are not authorized for, redirect them to the home page
        this.router.navigate(['/']);
        return false;
      }
    } else {
      // If the user is not logged in, redirect them to the login page
      this.router.navigate(['/login']);
      return false;
    }

  }


  
}
