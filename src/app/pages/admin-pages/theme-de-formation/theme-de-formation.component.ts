import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ThemeDeFormation } from 'src/app/entities/ThemeDeFormation.model';
import { ThemeDeFormationService } from 'src/app/services/theme-de-formation.service';
import { AuthService } from 'src/app/services/auth.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-theme-de-formation',
  templateUrl: './theme-de-formation.component.html',
  styleUrls: ['./theme-de-formation.component.css','../apprenant/apprenant.component.css']
})
export class ThemeDeFormationComponent {
 public modalRef!: BsModalRef;
  public ThemeDeFormation!: ThemeDeFormation[];
  public themeDeFormation!: ThemeDeFormation;
  public editForm!: FormGroup;
 // public editForm2!: FormGroup;
  private deleteId !: number;
  public message!: string;
  public ajoutForm!: FormGroup; 
  selectedFile: any;
    Data!: Blob;
    dbimage: any;
    public numberOfThemes!: number;
    errorMessage!: string;
    successMessage!:string;
  noDataAvailable!: boolean;
  

  constructor(private modalService: BsModalService, private httpClient: HttpClient, private fb: FormBuilder,public themeDeFormationService : ThemeDeFormationService,private authService:AuthService) { }
  //Pagination//
  page:number=1;
  count:number=0;
  tableSize:number=3;
  onTableChange(event:any){
    this.page=event;
    this.getThemeDeFormation();

  }

  getThemeDeFormation() {
    this.themeDeFormationService.getThemeDeFormation().subscribe(response => {
      console.log(response);
     
      this.ThemeDeFormation = response;
      this.numberOfThemes = response.length;
    
      if (response.length === 0) {
        this.noDataAvailable = true;
      } else {
        this.noDataAvailable = false;
      }
      });
  }
  


//  onFileChange(event) {
//     this.Departement.file = event.target.files[0];
//   }
//   public onFileChanged(event:any) {
  
//    this.selectedFile = event.target.files[0];
   
  
// }

  onSubmit (f: NgForm) {
  
    
  this.themeDeFormationService.addThemeDeFormation(f.value).subscribe(
    (response) => {
      // Inscription saved successfully
      // Do any additional actions here if needed
      this.errorMessage = '';
      this.successMessage = 'Théme bien ajouté .';
      this.ngOnInit();
    },
    (error) => {
      // Error occurred
      console.error('Error saving apprenant:', error);
      this.errorMessage = 'Théme non ajouté veuillez verifier votre formulaire.';
      this.successMessage = '';
      this.ngOnInit();
    })
    
  this.modalService.hide(); 

  }

  // onSubmits() {
  //   this.departementService .addDepartement(
  //     this.Departement
  //   )
  // }

  ngOnInit(): void {
    
    this.getThemeDeFormation();
    console.log(this.authService.getToken())
    
    this.editForm = this.fb.group({
    
       idFormation: [''],
      abrevation: [''],
      description: [''],
        nomFormation: [''],
   
     // file: [''],


    })

}


/************************ pop up****************** */
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

  
openModal(modalTemplate: TemplateRef<any>) {
  this.modalRef = this.modalService.show(modalTemplate,
    {
      class: 'modal-dialogue-centered modal-md',
      backdrop: 'static',
      keyboard: true
    }
  );
}
onSave() {
  
    
  this.themeDeFormationService.updateThemeDeFormation(this.editForm.value).subscribe(
    (response) => {
      // Inscription saved successfully
      // Do any additional actions here if needed
      this.errorMessage = '';
      this.successMessage = 'Théme bien modifié .';
    },
    (error) => {
      // Error occurred
      console.error('Error saving Théme:', error);
      this.errorMessage = 'Théme non modifié veuillez verifier votre formulaire.';
      this.successMessage = '';
    })

  this.modalService.hide(); 

  }



/**********************Template delete ******************* */
openDelete(modalTemplate: TemplateRef<any>, ThemeDeFormation: ThemeDeFormation) {
  this.deleteId=ThemeDeFormation.idFormation;
      this.modalRef = this.modalService.show(modalTemplate,
        {
          class: 'modal-dialogue-centered modal-md',
          backdrop: 'static',
          keyboard: true
        }
      );
}
 onDelete(ThemeDeFormation : ThemeDeFormation) {
   this.themeDeFormationService.deleteThemeDeFormation(this.deleteId).subscribe(response => {
    console.log(response);
    
    this.ngOnInit();})
 
  this.modalService.hide(); //dismiss the modal
  } 
  


}