import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Role } from '../entities/role.model';
import { User } from '../entities/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL: string = "http://localhost:8080/apprenant/api/v1/auth/registerApprenant";

  constructor(private httpClient: HttpClient, private authService : AuthService,private modalService: BsModalService) { }

  addUser(user: User): Observable<User> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.post<User>(`${this.apiURL}`, user);
  }

  /* getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.apiURL}/roles`);
  } */



}
