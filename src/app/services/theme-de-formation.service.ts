import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { ThemeDeFormation} from '../entities/ThemeDeFormation.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeDeFormationService {

   apiURL: string = "http://192.168.1.180:8080/apprenant/api/themeDeFormation/";

  constructor(private httpClient: HttpClient, private authService : AuthService) { }



  
  getThemeDeFormation() {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    
    return this.httpClient.get<ThemeDeFormation[]>(this.apiURL+"all",{headers:httpHeaders});
  }
  
    getThemeDeFormationn() {
    
    
    return this.httpClient.get<ThemeDeFormation[]>(this.apiURL+"all");
  }

   


    addThemeDeFormation(ThemeDeF:ThemeDeFormation) : Observable <ThemeDeFormation> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt});
     console.log(ThemeDeFormation);
    return this.httpClient.post<ThemeDeFormation>(this.apiURL+"add",ThemeDeF,{headers:httpHeaders}).pipe(
      catchError((error) => {
        if (error.error && error.error.message === 'formation existe deja ') {
          // Display alert message using ngx-toastr or Angular's built-in Alert service
        }
        return throwError(error);
      })
    );
  }
      
    updateThemeDeFormation(ThemeDeFormation :ThemeDeFormation)  {
      const url = `${this.apiURL}${ThemeDeFormation.idFormation}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})

      return this.httpClient.put<ThemeDeFormation>(url,ThemeDeFormation, {headers:httpHeaders});
      }

      deleteThemeDeFormation(idFormation : number) {
      //const urlDelete ='${this.apiURL}/${id}';  
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt })


         return this.httpClient.delete(this.apiURL+idFormation ,{headers:httpHeaders});}
      } 
    

