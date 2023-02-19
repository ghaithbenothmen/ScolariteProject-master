import { Apprenant } from './../entities/apprenant.model';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class ApprenantService  {
  apiURL: string = "http://localhost:8080/apprenant/api";
 
  constructor(private httpClient: HttpClient, private authService : AuthService,private modalService: BsModalService) { }


  getApprenants() {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpClient.get<Apprenant[]>(this.apiURL,{headers:httpHeaders});}


    ajoutApp(app: Apprenant) : Observable <Apprenant> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});

    return this.httpClient.post<Apprenant>(this.apiURL,app,{headers:httpHeaders})
  }
      
    updateApp(app : Apprenant)  {
      const url = `${this.apiURL}/${app.idApprenant}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})

      return this.httpClient.put<Apprenant>(url,app, {headers:httpHeaders});
      }

      supprimerApp(app : Apprenant) {
        const url = `${this.apiURL}/${app.idApprenant}/patch`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 

          return this.httpClient.put<Apprenant>(url,app,  {headers:httpHeaders});
        }


 

    
 /*  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
debugger
    const localToken = localStorage.getItem('token');
    request = request.clone({ headers: request.headers.set('Authorization', 'bearer ' + localToken)});
    return next.handle(request);
  } */

}
