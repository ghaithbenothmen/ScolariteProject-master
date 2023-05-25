import { SessionFormation } from './../entities/SessionFormation.model';
import { Injectable } from '@angular/core';



import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, catchError, map, throwError } from 'rxjs';

import {Inscription } from '../entities/inscription.model';
import { Apprenant } from '../entities/apprenant.model';


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  successMessage!: string;
  errorMessage!: string;
 public apprenants!:Apprenant[];
 public id!:number;
  public inscription!: Inscription;
  apiURL: string = "http://localhost:8080/apprenant/api/inscription/";

  

  constructor(private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) {
  
  }
  

    /* addInsecription(apprenants:Apprenant[],inscription :Inscription,selectedForeignKeyId: number) : Observable <Inscription> {
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


      //formData.append('SesionDeFormation',  JSON.stringify(inscription.SesionDeFormation.idSessionFormation));
      //formData.append('apprenant', JSON.stringify(inscription.apprenant.id));
 
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
 */

  addInsecription(idSessionFormation: number, idApp: number, inscription: Inscription): Observable<Inscription> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Content-Type": 'application/json', "Authorization": jwt });
  
    return this.httpClient.post<Inscription>(this.apiURL + "add?idSessionFormation=" + idSessionFormation + "&apprenant=" + idApp, inscription, { headers: httpHeaders, observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          // Inscription saved successfully
          console.log('Inscription saved:', response.body);
          this.successMessage = 'Inscription saved successfully.';
          // Display success message in your frontend
        } else if (response.status === 400) {
          // Apprenant is already inscribed
          console.log('You are already inscribed');
          this.errorMessage = 'You are already inscribed.';
          // Display error message in your frontend
        }
        return response.body;
      }),
      
    );
  }



  getInscription() {

    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt});


    return this.httpClient.get<Inscription[]>(this.apiURL + "all",{headers:httpHeaders});
   }

   deleteInsc(code : number) {
    //const urlDelete ='${this.apiURL}/${id}';  
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({ "Authorization": jwt })


       return this.httpClient.delete(this.apiURL+code,{headers:httpHeaders});}
    } 

