import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Actualite } from 'src/app/entities/actualite.model';
import { ActualiteService } from 'src/app/services/actualite.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-actu-page',
  templateUrl: './actu-page.component.html',
  styleUrls: ['./actu-page.component.css']
})
export class ActuPageComponent {
  public Actualites!: Actualite[];
  public actualite!: Actualite;
public dateActualite !: string;
  constructor( private datePipe: DatePipe,  private fb: FormBuilder,public actualiteService  : ActualiteService,private authService:AuthService) { }
 
  getActualite() {
    this.actualiteService.getActualite().subscribe(response => {
      console.log(response);
     
      this.Actualites = response;
      response.forEach((item) => {
        this.dateActualite = this.datePipe.transform(item.dateActualite, 'dd MMMM yyyy')??"";
      });
      
      });
  }
  
  ngOnInit(): void {
    
    this.getActualite();
    
    console.log(this.authService.getToken())
  
}
}
