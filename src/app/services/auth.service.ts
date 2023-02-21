import { Apprenant } from './../apprenant/apprenant.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../entities/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiURL: string = 'http://localhost:8080/apprenant/api';
  public token!: string;
  public isloggedIn!: boolean ;
  public roles!: string[];
  loggedUser!: string;
  private helper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/v1/auth/authenticate', user);
  }

  /*  getApprenants() {
     debugger
     return this.http.get<Apprenant>(this.apiURL); */

  /* this.http.get('http://localhost:8080/apprenant/api').subscribe(
    response => {
      console.log(response);
      this.apprenants = response;
    } 
  ); */


  /*  } */


  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }
  loadToken() {
    this.token = localStorage.getItem('token')!;
    //this.decodeJWT();
  }

  getToken(): string {
    return this.token;

  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  decodeJWT()
  {   if (this.token == undefined)
            return;
    const decodedToken = this.helper.decodeToken(this.token);
    //console.log("roles :"+this.roles);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }
  /* isAdmin():Boolean{
    if (!this.roles) //this.roles== undefiened
    return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    ;
  }   */

  isLoggedIn(): boolean {
    // Check if there is a user token in local storage or session storage
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }
}
