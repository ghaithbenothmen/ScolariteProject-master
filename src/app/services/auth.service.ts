import { Role } from './../entities/role.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { User } from '../entities/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';


interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public apiURL: string = 'http://localhost:8080/apprenant/api';
  public token!: string;
  public role!: any;
  public id!: number;
 public Id!: any;
  public isloggedIn!: boolean ;
  public roles!: Role;
  loggedUser!: string;
  private helper = new JwtHelperService();
 

  constructor(private router: Router, private http: HttpClient) { }

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/v1/auth/authenticate', user)
  }



  saveToken(jwt: string,role:any,id:number ) {
    localStorage.setItem('token', jwt);
    localStorage.setItem('role', role as Role);
    localStorage.setItem('UserId', id.toString() );

    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }
  loadToken() {
   this.Id=localStorage.getItem('UserId')!;
    this.role = localStorage.getItem('role')!;
    this.token = localStorage.getItem('token')!;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  

  }

  logout() {
    this.loggedUser = undefined!;
    this.role = undefined!;
    this.Id = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('token');
     localStorage.removeItem('UserId');
    localStorage.removeItem('role');
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

  isAdmin() {
    const role = localStorage.getItem('role');
    return role === Role.Admin.toString(); // Convert to string for comparison
  }

  isApp() {
    const role = localStorage.getItem('role');
    return role === Role.Apprenant.toString(); // Convert to string for comparison
  }

  getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(this.apiURL + '/v1/auth/email/' +email)
  }
}
