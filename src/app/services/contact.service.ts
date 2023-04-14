
import { Contact } from '../entities/contact.model';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiURL: string = "http://localhost:8080/apprenant/api/contact";

  constructor(private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) { }


  getContact() {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.httpClient.get<Contact[]>(this.apiURL, { headers: httpHeaders });
  }


  ajoutCon(app: Contact): Observable<Contact> {


    return this.httpClient.post<Contact>(this.apiURL + "/add", app)
  }

  updateCon(app: Contact) {
    const url = `${this.apiURL}/${app.idContact}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.put<Contact>(url, app, { headers: httpHeaders });
  }

  supprimerCon(idContact : number) {
    const url = `${this.apiURL}/${idContact}/delete`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.delete(url,  { headers: httpHeaders });
  }
}
