
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Etablissement } from '../entities/etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class EtablissementService {
  apiURL: string = "http://localhost:8080/apprenant/api/Etablissement/";

  constructor(private httpClient: HttpClient, private authService : AuthService,private modalService: BsModalService) { }


  
  
  getEtablissements() {
   
    
    return this.httpClient.get<Etablissement[]>(this.apiURL+"all");
  }

    ajoutEtab(etab: Etablissement) : Observable <Etablissement> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});

    return this.httpClient.post<Etablissement>(this.apiURL+"add",etab,{headers:httpHeaders})
    }
      
    updateEtab(etab : Etablissement)  {
      const url = `${this.apiURL}/${etab.codeEtablissement}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})

      return this.httpClient.put<Etablissement>(url,etab, {headers:httpHeaders});
      }

      // supprimerApp(app : Etablissement) {
      //   const url = `${this.apiURL}/${app.codeEtablissement}/patch`;
      //   let jwt = this.authService.getToken();
      //   jwt = "Bearer "+jwt;
      //   let httpHeaders = new HttpHeaders({"Authorization":jwt})

      //     return this.httpClient.put<Etablissement>(url,app,  {headers:httpHeaders});
      //   }

  
  addEtablissement (file :File,
    etab:Etablissement
  ) : Observable <Etablissement> {
    let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    
    const formData = new FormData();
    formData.append('file',file);
    formData.append('NomEtablissement', etab.nomEtablissement);
    formData.append('telEtablissement',etab.telEtablissement.toString());
    formData.append('AbreviationEtablissement', etab.abreviationEtablissement);
    
    formData.append('EmailEtablissement', etab.emailEtablissement);
    formData.append('RemarqueEtablissement', etab.remarqueEtablissement);

    return this.httpClient.post<Etablissement>(this.apiURL+'add', formData,{headers:httpHeaders});
  }



   updateetab( file :File,etab:Etablissement) :Observable <Etablissement>  {
      const url = `${this.apiURL}${etab.codeEtablissement}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
 const formData = new FormData();
    formData.append('file',file);
    formData.append('NomEtablissement', etab.nomEtablissement);
    formData.append('telEtablissement',etab.telEtablissement.toString());
    formData.append('AbreviationEtablissement', etab.abreviationEtablissement);
    
    formData.append('EmailEtablissement', etab.emailEtablissement);
    formData.append('RemarqueEtablissement', etab.remarqueEtablissement);
      return this.httpClient.put<Etablissement>(url, formData, {headers:httpHeaders});
      
      }

}


