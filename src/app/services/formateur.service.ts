
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Formateur } from '../entities/formateur.model';

@Injectable({
  providedIn: 'root'
})
export class formateurService  {
  apiURL: string = "http://localhost:8080/apprenant/api/Formateur/";

  constructor(private httpClient: HttpClient, private authService : AuthService,private modalService: BsModalService) { }



  
  getFormateur() {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    
    return this.httpClient.get<Formateur[]>(this.apiURL+"all",{headers:httpHeaders});}

    // ajoutdepart(depart: Departement) : Observable <Departement> {
    //   let jwt = this.authService.getToken();
    //   jwt = "Bearer "+jwt;
    //   let httpHeaders = new HttpHeaders({"Authorization":jwt});

    // return this.httpClient.post<Departement>(this.apiURL+"add",depart,{headers:httpHeaders})
    // }
      
    // updatedepart(depart : Departement)  {
    //   const url = `${this.apiURL}/${depart.codeDepartement}`;
    //   let jwt = this.authService.getToken();
    //   jwt = "Bearer "+jwt;
    //   let httpHeaders = new HttpHeaders({"Authorization":jwt})

    //   return this.httpClient.put<Departement>(url,depart, {headers:httpHeaders});
    //   }

      // supprimerApp(app : Departement) {
      //   const url = `${this.apiURL}/${app.codeDepartement}/patch`;
      //   let jwt = this.authService.getToken();
      //   jwt = "Bearer "+jwt;
      //   let httpHeaders = new HttpHeaders({"Authorization":jwt})

      //     return this.httpClient.put<Departement>(url,app,  {headers:httpHeaders});
      //   }

  
  addformateur(file :File,
     Formateur:Formateur
  ) : Observable <Formateur> {
    let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('Password', Formateur.password);
     formData.append('NomFormateur', Formateur.nom);
      formData.append('PrenonFormateur', Formateur.prenom);
     formData.append('telFormateur', Formateur.tel.toString());

    formData.append('Specialite', Formateur.specialite);
    
    formData.append('Email', Formateur.email);
    formData.append('AdresseFormateur', Formateur.adresse);
    return this.httpClient.post<Formateur>(this.apiURL+'add', formData,{headers:httpHeaders});
  }



   updateFormateur( file :File,Formateur:Formateur) :Observable <Formateur>  {
      const url = `${this.apiURL}${Formateur.id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
 const formData = new FormData();
    formData.append('file',file);
     formData.append('NomFormateur', Formateur.nom);
      formData.append('PrenonFormateur', Formateur.prenom);
     formData.append('telFormateur', Formateur.tel.toString());

    formData.append('Specialite', Formateur.specialite);
     formData.append('Password', Formateur.password);
    formData.append('Email', Formateur.email);
    formData.append('AdresseFormateur', Formateur.adresse);
      return this.httpClient.put<Formateur>(url, formData, {headers:httpHeaders});
      
      }


      deleteFormateur(code : number) {
      //const urlDelete ='${this.apiURL}/${id}';  
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })


         return this.httpClient.delete(this.apiURL+code,{headers:httpHeaders});}
      } 
    



