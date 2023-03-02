
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Departement } from 'src/app/pages/departement/departement.component';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  apiURL: string = "http://localhost:8080/apprenant/api/Departement/";

  constructor(private httpClient: HttpClient, private authService : AuthService,private modalService: BsModalService) { }



  
  getDepartement() {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    
    return this.httpClient.get<Departement[]>(this.apiURL+"all",{headers:httpHeaders});}

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

  
  addDepartement (file :File,
    depart:Departement
  ) : Observable <Departement> {
    let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    
    const formData = new FormData();
    formData.append('file',file);
    formData.append('NomDepartement', depart.nomDepartement);
    // formData.append('telDepartement',depart.telDepartement);
    formData.append('AbreviationDepartement', depart.abreviationDepartement);
    
    formData.append('EmailDepartement', depart.emailDepartement);
    formData.append('RemarqueDepartement', depart.remarqueDepartement);

    return this.httpClient.post<Departement>(this.apiURL+'add', formData,{headers:httpHeaders});
  }



   updatedepart( file :File,depart:Departement) :Observable <Departement>  {
      const url = `${this.apiURL}${depart.codeDepartement}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
 const formData = new FormData();
    formData.append('file',file);
    formData.append('NomDepartement', depart.nomDepartement);
    // formData.append('telDepartement',depart.telDepartement);
    formData.append('AbreviationDepartement', depart.abreviationDepartement);
    
    formData.append('EmailDepartement', depart.emailDepartement);
    formData.append('RemarqueDepartement', depart.remarqueDepartement);
      return this.httpClient.put<Departement>(url, formData, {headers:httpHeaders});
      }

}


