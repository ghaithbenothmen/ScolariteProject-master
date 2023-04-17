import { ThemeDeFormation } from './../entities/ThemeDeFormation.model';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, catchError, throwError } from 'rxjs';

import { Formateur } from '../entities/formateur.model';

@Injectable({
  providedIn: 'root'
})
export class SessionFormationService {



  public formateur!: Formateur;
  apiURL: string = "http://localhost:8080/apprenant/api/SesionDeFormation/";
  idFormateur!: number;
  codeFormateur!: number;
  public record: any;
  public sessionFormations: SessionFormation[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) { }


  
  getFormateur() {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    
    return this.httpClient.get<Formateur[]>(this.apiURL+"all",{headers:httpHeaders});}

  getSessionFormation() {

   return this.httpClient.get<SessionFormation[]>(this.apiURL + "all",);
  }
  addimage(file: File

  ): Observable<SessionFormation> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });

    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<SessionFormation>(this.apiURL + '/addImg', formData, { headers: httpHeaders });
  }


  addSessionFormation(SessionFormation: SessionFormation, file: File): Observable<SessionFormation> {

    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });

    const formData = new FormData();

    formData.append('file', file);
    formData.append('DateDebut', SessionFormation.dateDebut.toString());
    formData.append('nbrHeures', SessionFormation.nbrHeures.toString());
    formData.append('Description', SessionFormation.description);

    formData.append('formateur', JSON.stringify(SessionFormation.formateur.codeFormateur));
    // formData.append('RemarqueEtablissement', SessionFormation.idSessionFormation.toString());
    formData.append('LocalFormation', SessionFormation.localFormation);
    formData.append('TypeFormation', SessionFormation.typeFormation);
    formData.append('themeDeFormation', JSON.stringify(SessionFormation.themeDeFormation.idFormation));


    return this.httpClient.post<SessionFormation>(this.apiURL + 'add', formData, { headers: httpHeaders });//.pipe(
    //   catchError((error) => {
    //     if (error.error && error.error.message === 'verifie ') {
    //       // Display alert message using ngx-toastr or Angular's built-in Alert service
    //     }
    //     return throwError(error);
    //   })
    // );
  }


  updateSessionFormation(themeDeFormations:ThemeDeFormation[],formateurs: Formateur[], sessionFormation: SessionFormation, file: File, selectedForeignKeyId: number,selectedForeignKeyId2: number): Observable<SessionFormation> {
    const url = `${this.apiURL}${sessionFormation.idSessionFormation}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    const formData = new FormData();

    formData.append('file', file);
    formData.append('DateDebut', sessionFormation.dateDebut.toString());
    formData.append('nbrHeures', sessionFormation.nbrHeures.toString());
    formData.append('Description', sessionFormation.description);

    console.log('theme:',themeDeFormations);
    
    const foreignKeyFormateur = formateurs.find(formateur => formateur.codeFormateur == selectedForeignKeyId);
    if (foreignKeyFormateur) {
      formData.append('formateur', JSON.stringify(foreignKeyFormateur.codeFormateur));
      console.log(foreignKeyFormateur);
    } else {
      console.log('Foreign key object not found.');

    }

    const foreignKeyTheme = themeDeFormations.find(themeDeFormation => themeDeFormation.idFormation == selectedForeignKeyId2);
    if (foreignKeyTheme) {
      formData.append('themeDeFormation', JSON.stringify(foreignKeyTheme.idFormation));
      console.log('heloo',foreignKeyTheme);
    } else {
      console.log('Foreign key object not found.');

    }

    /*    console.log('formateurs:', this.formateurs);
       const selectedFormateur = this.formateurs.find(formateur => formateur.codeFormateur === this.codeFormateur);
   if (selectedFormateur) {
     formData.append('codeFormateur', JSON.stringify(selectedFormateur.codeFormateur));
   } */


    //formData.append('formateur', JSON.stringify(sessionFormation.formateur.codeFormateur));

    // formData.append('RemarqueEtablissement', SessionFormation.idSessionFormation.toString());
    formData.append('LocalFormation', sessionFormation.localFormation);
    formData.append('typeFormation', sessionFormation.typeFormation);
    //formData.append('themeDeFormation', JSON.stringify(SessionFormation.themeDeFormation.idFormation));

      
    

    return this.httpClient.put<SessionFormation>(url, formData, { headers: httpHeaders });
  }

  deleteSessionFormation(code: number) {
    //const urlDelete ='${this.apiURL}/${id}';  
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })


    return this.httpClient.delete(this.apiURL + code, { headers: httpHeaders });
  }


  findSessionById(code: number) {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })

    return this.httpClient.get(this.apiURL + code, { headers: httpHeaders });
  }


}


