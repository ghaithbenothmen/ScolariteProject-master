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
    this.actualiteService.getActualite().subscribe((response:any[]) => {
      console.log(response);
      
      response.forEach((item) => {
        const date=new Date(item.dateActualite)
        item.dateActualite = this.datePipe.transform(date, 'dd MMMM yyyy')??"";
      });
      
      this.Actualites = response;
     
      });
  }
  
  ngOnInit(): void {
    
    this.getActualite();
    
    console.log(this.authService.getToken())
  
}
}
