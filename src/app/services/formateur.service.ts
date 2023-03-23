
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { formateur } from '../entities/formateur.model';

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
    
    return this.httpClient.get<formateur[]>(this.apiURL+"all",{headers:httpHeaders});}

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
     Formateur:formateur
  ) : Observable <formateur> {
    let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    
    const formData = new FormData();
    formData.append('file',file);
     formData.append('NomFormateur', Formateur.nomFormateur);
      formData.append('PrenonFormateur', Formateur.prenonFormateur);
     formData.append('telFormateur', Formateur.telFormateur.toString());

    formData.append('Specialite', Formateur.specialite);
    
    formData.append('EmailFormateur', Formateur.emailFormateur);
    formData.append('AdresseFormateur', Formateur.adresseFormateur);
    return this.httpClient.post<formateur>(this.apiURL+'add', formData,{headers:httpHeaders});
  }



   updateFormateur( file :File,Formateur:formateur) :Observable <formateur>  {
      const url = `${this.apiURL}${Formateur.codeFormateur}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
 const formData = new FormData();
    formData.append('file',file);
     formData.append('NomFormateur', Formateur.nomFormateur);
      formData.append('PrenonFormateur', Formateur.prenonFormateur);
     formData.append('telFormateur', Formateur.telFormateur.toString());

    formData.append('Specialite', Formateur.specialite);
    
    formData.append('EmailFormateur', Formateur.emailFormateur);
    formData.append('AdresseFormateur', Formateur.adresseFormateur);
      return this.httpClient.put<formateur>(url, formData, {headers:httpHeaders});
      
      }


      deleteFormateur(code : number) {
      //const urlDelete ='${this.apiURL}/${id}';  
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })


         return this.httpClient.delete(this.apiURL+code,{headers:httpHeaders});}
      } 
    



