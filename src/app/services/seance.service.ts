import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { seance } from '../entities/seance.model';
import { SessionFormation } from '../entities/SessionFormation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {


  public SessionFormationr!:SessionFormation;
  apiURL: string = "http://localhost:8080/apprenant/api/SeanceFormation/";
 
  
  public seance: seance[] = [];

  constructor(private httpClient: HttpClient, private authService: AuthService, private modalService: BsModalService) { }


  getSeance() {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    
    return this.httpClient.get<seance[]>(this.apiURL+"all",{headers:httpHeaders});}

  addSeance(seance : seance , file: File , selectedCheckboxes:any[]): Observable<seance> {

    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });

    const formData = new FormData();
    const checkboxIds = selectedCheckboxes.map(checkbox => checkbox.id);
    formData.append('inscription', JSON.stringify(checkboxIds));

    formData.append('file', file);
     formData.append('Date',seance.date.toString());
    formData.append(' heuresDebut', seance.heuresDebut.toString());
    formData.append('nbrHeures', seance.nbrHeures.toString());
    formData.append('Contenu', seance.contenu);

    formData.append('idSessionFormation', JSON.stringify(seance.sessionFormation.idSessionFormation));
    // formData.append('RemarqueEtablissement', SessionFormation.idSessionFormation.toString());
    formData.append('local', seance.local);
   
    //formData.append('Inscription', JSON.stringify(seance.themeDeFormation.idFormation));


    return this.httpClient.post<seance>(this.apiURL + 'add', formData, { headers: httpHeaders });//.pipe(
    //   catchError((error) => {
    //     if (error.error && error.error.message === 'verifie ') {
    //       // Display alert message using ngx-toastr or Angular's built-in Alert service
    //     }
    //     return throwError(error);
    //   })
    // );
  }



 
  updateSeance( seance : seance , file: File): Observable<seance> {
    const url = `${this.apiURL}${seance.idSeanceFormation}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    const formData = new FormData();

    formData.append('file', file);
     formData.append('Date',seance.date.toString());
    formData.append(' heuresDebut', seance.heuresDebut.toString());
    formData.append('nbrHeures', seance.nbrHeures.toString());
    formData.append('Contenu', seance.contenu);

 formData.append('idSessionFormation', JSON.stringify(seance.idSessionFormation));

    // formData.append('RemarqueEtablissement', SessionFormation.idSessionFormation.toString());
    formData.append('local', seance.local);

    
    
    return this.httpClient.put<seance>(url, formData, { headers: httpHeaders });
  }



  deleteSeance(code: number) {
    //const urlDelete ='${this.apiURL}/${id}';  
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })


    return this.httpClient.delete(this.apiURL + code, { headers: httpHeaders });
  }
}
