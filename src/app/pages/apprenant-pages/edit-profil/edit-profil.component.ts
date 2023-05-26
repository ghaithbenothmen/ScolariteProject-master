import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { ApprenantService } from 'src/app/services/apprenant.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent {
  public modalRef!: BsModalRef;
  public apprenants!: Apprenant[];
  public apprenant!: Apprenant;
  public id !: number;
  public UserId !: string | null;
  public editForm!: FormGroup;
  public idUser!: number;
  errorMessage!: string;
  successMessage!:string;
  public items = ['Eleve', 'Etudiant', "demandeur  d'emploie", 'Professionel'];

  constructor( private fb: FormBuilder, private appService: ApprenantService, private route:ActivatedRoute , private modalService: BsModalService) { } 

onreload(){
  window.location.reload();
}

  onSave() {

    if (this.editForm.valid) {
    console.log("id",this.editForm.value);
    console.log("id",this.editForm.value.id);
        this.appService.updateApp(this.editForm.value).subscribe(response => {
          console.log(response);
          this.errorMessage = '';
          this.successMessage = 'Vos informations ont été bien modifier .';
        },
        (error) => {
          // Error occurred
          console.error('Error saving inscription:', error);
          this.errorMessage = 'Vérifier votre formulaire .';
          this.successMessage = '';
        }
        ); 
          this.ngOnInit();
          
    
      }else{
        this.errorMessage = 'Vérifier votre formulaire .';
      }
      }

  getApprenants() {
    this.appService.getApprenants().subscribe(response => {
      //console.log('app',response);
      //this.apprenants = response;
   
      this.apprenants = response.filter(app => app.id === this.idUser); //nafsha f html 
       console.log(this.apprenants)
    });
  }

  private passwordsMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordsMismatch': true } : null;
  }
  
  ngOnInit(): void {

  


   
this.getApprenants();
    //this.id=this.route.snapshot.paramMap.get("id");
    this.id = this.route.snapshot.params["id"];

    this.UserId = localStorage.getItem('UserId');
    this.idUser=Number(this.UserId) 
    console.log("lklk",this.UserId);

      this.editForm = this.fb.group({
        id: [''],
  
        nomApprenant: [''],
        prenomApprenant: [''],
        /* sexeApprenant: [''], */
        dateNaissanceApprenant: [''],

        email: ['', [Validators.required,Validators.email]],

        
        telApprenant: [''],
        adresseApprenant: [''],
        archiveApprenant: [''],
        sexeApprenant: [''],
        niveauApprenant: [''],
        qualiteApprenant: [''],
        confirmPassword: ['', [Validators.required]],
        password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      
  
      }, { validator: this.passwordsMatchValidator });
  
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
}
