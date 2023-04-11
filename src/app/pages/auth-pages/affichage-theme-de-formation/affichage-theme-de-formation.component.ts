import { Component, TemplateRef } from '@angular/core';
import { ThemeDeFormation } from '../../../entities/ThemeDeFormation.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeDeFormationService } from 'src/app/services/theme-de-formation.service';

@Component({
  selector: 'app-affichage-theme-de-formation',
  templateUrl: './affichage-theme-de-formation.component.html',
  styleUrls: ['./affichage-theme-de-formation.component.css']
})
export class AffichageThemeDeFormationComponent {
    public modalRef!: BsModalRef;
  public ThemeDeFormation!: ThemeDeFormation[];
  public themeDeFormation!:ThemeDeFormation ;
public dateActualite !: string;
  editForm: any;
  
public isCollapsed = true;

  constructor(private modalService: BsModalService, private datePipe: DatePipe,  private fb: FormBuilder,public themeDeFormationService:ThemeDeFormationService ,private authService:AuthService) { }
 
  getThemeDeFormationn() {
    this.themeDeFormationService.getThemeDeFormationn().subscribe(response => {
      console.log(response);
     
      this.ThemeDeFormation = response;
   
      });
  }
  ngOnInit(): void {
    
    this.getThemeDeFormationn();
    console.log(this.authService.getToken())
    
    this.editForm = this.fb.group({
    
       idFormation: [''],
      abrevation: [''],
      description: [''],
        nomFormation: [''],
   
     // file: [''],


    })

}

   openDetails(modalTemplate: TemplateRef<any>, ThemeDeFormation: ThemeDeFormation) {
    this.modalRef = this.modalService.show(modalTemplate,
      {

        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );

    this.editForm.patchValue({
      idFormation: ThemeDeFormation.idFormation,
      abrevation:ThemeDeFormation.abrevation,
      description: ThemeDeFormation.description,
     nomFormation: ThemeDeFormation.nomFormation,

    });

  }
}


