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

  apiURL: string = "http://localhost:8080/apprenant/api/SesionDeFormation/";

 
  constructor(private httpClient: HttpClient, private authService : AuthService,private modalService: BsModalService) { }


  getSessionFormation() {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})

    return this.httpClient.get<SessionFormation[]>(this.apiURL+"all",{headers:httpHeaders});}

   addimage (file :File

  ) : Observable <SessionFormation> {
    let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    
    const formData = new FormData();
    formData.append('file',file);
    
    return this.httpClient.post<SessionFormation>(this.apiURL+'/addImg', formData,{headers:httpHeaders});
  }


  addSessionFormation( SessionFormation: SessionFormation, file :File ): Observable<SessionFormation> {
   
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});

    const formData = new FormData();
    
   formData.append('file',file);
    formData.append('DateDebut', SessionFormation.dateDebut.toString());
   formData.append('nbrHeures',SessionFormation.nbrHeures.toString());
    formData.append('Description',SessionFormation.description);
    
    formData.append('formateur', JSON.stringify(SessionFormation.formateur.codeFormateur));
    // formData.append('RemarqueEtablissement', SessionFormation.idSessionFormation.toString());
    formData.append('LocalFormation', SessionFormation.localFormation);
    formData.append('TypeFormation', SessionFormation.typeFormation);
      formData.append('themeDeFormation', JSON.stringify(SessionFormation.themeDeFormation.idFormation));
    
    
    return this.httpClient.post<SessionFormation>(this.apiURL + 'add',  formData, { headers: httpHeaders });//.pipe(
    //   catchError((error) => {
    //     if (error.error && error.error.message === 'verifie ') {
    //       // Display alert message using ngx-toastr or Angular's built-in Alert service
    //     }
    //     return throwError(error);
    //   })
    // );
  }
      
    updateSessionFormation(SessionFormation : SessionFormation,file:File) :Observable<SessionFormation> {
      const url = `${this.apiURL}${SessionFormation.idSessionFormation}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
     const formData = new FormData();
    
   formData.append('file',file);
    formData.append('DateDebut', SessionFormation.dateDebut.toString());
   formData.append('nbrHeures',SessionFormation.nbrHeures.toString());
    formData.append('Description',SessionFormation.description);
    
    formData.append('formateur', JSON.stringify(SessionFormation.formateur.codeFormateur));
    // formData.append('RemarqueEtablissement', SessionFormation.idSessionFormation.toString());
    formData.append('LocalFormation', SessionFormation.localFormation);
    formData.append('typeFormation', SessionFormation.typeFormation);
     // formData.append('themeDeFormation', JSON.stringify(SessionFormation.themeDeFormation.idFormation));
    
      return this.httpClient.put<SessionFormation>(url,SessionFormation, {headers:httpHeaders});
      }

     deleteSessionFormation(code : number) {
      //const urlDelete ='${this.apiURL}/${id}';  
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })


         return this.httpClient.delete(this.apiURL+code,{headers:httpHeaders});}
      } 

