import { Actualite } from './../entities/actualite.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualiteService {
  apiURL: string = "http://localhost:8080/apprenant/api/actualite/";

  constructor(private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) { }

  getActualite() {
  
    return this.httpClient.get<Actualite[]>(this.apiURL + "all");
  }

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


  addActualite(file: File,
    actu: Actualite
  ): Observable<Actualite> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('titreActualite', actu.titreActualite);
    formData.append('descriptionActualite', actu.descriptionActualite);

    formData.append('dateActualite', actu.dateActualite.toString());

    return this.httpClient.post<Actualite>(this.apiURL + 'add', formData, { headers: httpHeaders });
  }



  updateActualite(file: File, actu: Actualite): Observable<Actualite> {
    const url = `${this.apiURL}${actu.codeActualite}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;

    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    const formData = new FormData();
    formData.append('file', file);
    formData.append('titreActualite', actu.titreActualite);
    formData.append('descriptionActualite', actu.descriptionActualite);

    formData.append('dateActualite', actu.dateActualite.toString());
    return this.httpClient.put<Actualite>(url, formData, { headers: httpHeaders });

  }


  deleteActualite(code: number) {
    //const urlDelete ='${this.apiURL}/${id}';  
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })


    return this.httpClient.delete(this.apiURL + code, { headers: httpHeaders });
  }
}
