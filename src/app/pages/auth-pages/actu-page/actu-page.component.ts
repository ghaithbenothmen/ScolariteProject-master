import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Actualite } from 'src/app/entities/actualite.model';
import { ActualiteService } from 'src/app/services/actualite.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-actu-page',
  templateUrl: './actu-page.component.html',
  styleUrls: ['../../../components/navbar/navbar.component.css','./actu-page.component.css']
})
export class ActuPageComponent {
    public modalRef!: BsModalRef;
  public Actualites!: Actualite[];
  public actualite!: Actualite;
public dateActualite !: string;
  editForm: any;
  
public isCollapsed = true;

  constructor(private modalService: BsModalService, private datePipe: DatePipe,  private fb: FormBuilder,public actualiteService  : ActualiteService,private authService:AuthService) { }
 
 
  page:number=1;
  count:number=0;
  tableSize:number=3;
  onTableChange(event:any){
    this.page=event;
    this.getActualite();

  }


  getActualite() {
    this.actualiteService.getActualite().subscribe((response:any[]) => {


     //filtrer les donnés avec date descendant
      this.Actualites = response.sort((a, b) => new Date(b.dateActualite).getTime() - new Date(a.dateActualite).getTime());
  
      
      response.forEach((item) => {
        const date=new Date(item.dateActualite);
        

        const dayOfWeek = date.getDay(); 
        item.dayOfWeek = this.getDayName(dayOfWeek);

        item.dateActualite = this.datePipe.transform(date, 'dd MMMM yyyy')??"";
        
      });
      
      this.Actualites = response;
     
      });
  }

  formatTime(timeString: string): string {
    const [hours, minutes] = timeString.split(':');
    const formattedHours = hours.padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }
  
  getDayName(dayOfWeek: number): string {
    
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return dayNames[dayOfWeek];
  }
  
  ngOnInit(): void {
    
    this.getActualite();
    
    console.log(this.authService.getToken())
  
  
  }
   

}
