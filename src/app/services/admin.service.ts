import { Injectable } from '@angular/core';
import { admin } from '../entities/admin.model';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
apiURL: string = "http://192.168.1.180:8080/apprenant/api/admin";

  constructor(private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) { }
  

  getadmin() {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.httpClient.get<admin[]>(this.apiURL, { headers: httpHeaders });
  }


  ajoutApp(app: admin): Observable<admin> {


    return this.httpClient.post<admin>(this.apiURL + "/add", app).pipe(
      catchError((error) => {
        if (error.error && error.error.message === 'Email already in use') {
          // Display alert message using ngx-toastr or Angular's built-in Alert service
        }
        return throwError(error);
      })
    );
  }

  updateApp(app: admin) {
    const url = `${this.apiURL}/${app.id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.put<admin>(url, app, { headers: httpHeaders });
  }

  supprimerApp(app: admin) {
    const url = `${this.apiURL}/${app.id}/patch`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.put<admin>(url, app, { headers: httpHeaders });
  }

  desArchiveApp(app: admin) {
    const url = `${this.apiURL}/${app.id}/patchArch`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.put<admin>(url, app, { headers: httpHeaders });
  }

  deleteApp(code : number) {
    const url = `${this.apiURL}/${code}/delete`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.delete<admin>(url, { headers: httpHeaders });
  }

  /*  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 debugger
     const localToken = localStorage.getItem('token');
     request = request.clone({ headers: request.headers.set('Authorization', 'bearer ' + localToken)});
     return next.handle(request);
   } */

}
