import { Etablissement } from './../entities/etablissement.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {
  apiURL: string = "http://localhost:8080/apprenant/api/Etablissement/";

  constructor(private httpClient: HttpClient, private authService : AuthService,private modalService: BsModalService) { }

  getApprenants() {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.httpClient.get<Etablissement[]>(this.apiURL+"all",{headers:httpHeaders});}

    ajoutEtab(etab: Etablissement) : Observable <Etablissement> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});

    return this.httpClient.post<Etablissement>(this.apiURL+"add",etab,{headers:httpHeaders})
  }
}


