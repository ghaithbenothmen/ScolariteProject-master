import { Injectable } from '@angular/core';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, catchError, throwError } from 'rxjs';

import {Inscription } from '../entities/inscription.model';
import { Apprenant } from '../entities/apprenant.model';


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
 public apprenants!:Apprenant[];
 public id!:number;
  public inscription!: Inscription;
  apiURL: string = "http://localhost:8080/apprenant/api/insecription/";
  

  constructor(private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) {
  
  }
  

    addInsecription(apprenants:Apprenant[],inscription :Inscription,selectedForeignKeyId: number) : Observable <Inscription> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});

      
      const formData = new FormData();
      const foreignKeyApprenant = apprenants.find(apprenant=>apprenant.id == selectedForeignKeyId);
     
      console.log("cc",selectedForeignKeyId);
      if (foreignKeyApprenant) {
        formData.append('Apprenant', JSON.stringify(foreignKeyApprenant.id));
        console.log("im here",apprenants)
        console.log(foreignKeyApprenant);
      } else {
        console.log('Foreign key object not found.');
  
      }


     /*  formData.append('SesionDeFormation',  JSON.stringify(inscription.SesionDeFormation.idSessionFormation));
      formData.append('apprenant', JSON.stringify(inscription.apprenant.id));
 */
     //console.log("fffff",inscription);

    return this.httpClient.post<Inscription>(this.apiURL+"add",formData,{headers:httpHeaders}).pipe(
      catchError((error) => {
        if (error.error && error.error.message === 'inscription existe deja ') {
          // Display alert message using ngx-toastr or Angular's built-in Alert service
        }
        return throwError(error);
      })
    );
  }

  getInscription() {

    return this.httpClient.get<Inscription[]>(this.apiURL + "all",);
   }
}
