import { Injectable } from '@angular/core';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, catchError, throwError } from 'rxjs';

import {inscription } from '../entities/inscription.model';


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
 
  public inscription!: inscription;
  apiURL: string = "http://localhost:8080/apprenant/api/SesionDeFormation/";
  

  constructor(private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) {
  
  }
  

    addInsecription(inscription:inscription) : Observable <inscription> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});
     console.log(inscription);
    return this.httpClient.post<inscription>(this.apiURL+"add",inscription,{headers:httpHeaders}).pipe(
      catchError((error) => {
        if (error.error && error.error.message === 'inscription existe deja ') {
          // Display alert message using ngx-toastr or Angular's built-in Alert service
        }
        return throwError(error);
      })
    );
  }
}
