import { Apprenant } from 'src/app/entities/apprenant.model';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class ApprenantService {
  apiURL: string = "http://localhost:8080/apprenant/api/apprenant";

  constructor(private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) { }
  

  getApprenants() {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.httpClient.get<Apprenant[]>(this.apiURL, { headers: httpHeaders });
  }

  getApprenantId(id:number) {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.httpClient.get<Apprenant>(`${this.apiURL}/${id}`, { headers: httpHeaders });
  }



  ajoutApp(app: Apprenant): Observable<Apprenant> {


    return this.httpClient.post<Apprenant>(this.apiURL + "/add", app).pipe(
      catchError((error) => {
        if (error.error && error.error.message === 'Email already in use') {
          // Display alert message using ngx-toastr or Angular's built-in Alert service
        }
        return throwError(error);
      })
    );
  }

  updateApp(app: Apprenant) {
    const url = `${this.apiURL}/${app.id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.put<Apprenant>(url, app, { headers: httpHeaders });
  }

  supprimerApp(app: Apprenant) {
    const url = `${this.apiURL}/${app.id}/patch`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.put<Apprenant>(url, app, { headers: httpHeaders });
  }

  desArchiveApp(app: Apprenant) {
    const url = `${this.apiURL}/${app.id}/patchArch`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.put<Apprenant>(url, app, { headers: httpHeaders });
  }

  deleteApp(code : number) {
    const url = `${this.apiURL}/${code}/delete`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.delete<Apprenant>(url, { headers: httpHeaders });
  }

  /*  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 debugger
     const localToken = localStorage.getItem('token');
     request = request.clone({ headers: request.headers.set('Authorization', 'bearer ' + localToken)});
     return next.handle(request);
   } */

}
