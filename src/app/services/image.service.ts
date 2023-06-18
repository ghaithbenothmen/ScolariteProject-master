import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etablissement } from '../entities/etablissement.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient : HttpClient,private authService:AuthService) { }
  apiURL: string = "http://192.168.1.180:8080/apprenant/api/Etablissement/etab";

getImage(){
 

  return this.httpClient.get<Etablissement[]>(this.apiURL);
}

}
