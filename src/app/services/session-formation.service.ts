import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, catchError, throwError } from 'rxjs';
import { SessionFormation } from '../entities/SessionFormation.model';

@Injectable({
  providedIn: 'root'
})
export class SessionFormationService {

  apiURL: string = "http://localhost:8080/apprenant/api/SesionDeFormation";
 
  constructor(private httpClient: HttpClient, private authService : AuthService,private modalService: BsModalService) { }


  getSessionFormation() {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpClient.get<SessionFormation>(this.apiURL+"/all",{headers:httpHeaders});}

addimage (file :File

  ) : Observable <SessionFormation> {
    let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    
    const formData = new FormData();
    formData.append('file',file);
    
    return this.httpClient.post<SessionFormation>(this.apiURL+'/addImg', formData,{headers:httpHeaders});
  }


    addSessionFormation(SessionFormation:SessionFormation) : Observable <SessionFormation> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});

    return this.httpClient.post<SessionFormation>(this.apiURL+'/add',SessionFormation,{headers:httpHeaders}).pipe(
      catchError((error) => {
        if (error.error && error.error.message === 'Email already in use') {
          // Display alert message using ngx-toastr or Angular's built-in Alert service
        }
        return throwError(error);
      })
    );
  }
      
    updateSessionFormation(SessionFormation : SessionFormation)  {
      const url = `${this.apiURL}/${SessionFormation.idSessionFormation}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})

      return this.httpClient.put<SessionFormation>(url,SessionFormation, {headers:httpHeaders});
      }

     deleteSessionFormation(code : number) {
      //const urlDelete ='${this.apiURL}/${id}';  
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })


         return this.httpClient.delete(this.apiURL+code,{headers:httpHeaders});}
      } 

