import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Actualite } from 'src/app/entities/actualite.model';
import { Apprenant } from 'src/app/entities/apprenant.model';
import { Role } from 'src/app/entities/role.model';
import { User } from 'src/app/entities/user.model';
import { ActualiteService } from 'src/app/services/actualite.service';
import { ApprenantService } from 'src/app/services/apprenant.service';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import { SessionFormationService } from 'src/app/services/session-formation.service';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { ThemeDeFormationService } from 'src/app/services/theme-de-formation.service';
import { formateurService } from 'src/app/services/formateur.service';
import { ThemeDeFormation } from 'src/app/entities/ThemeDeFormation.model';
import { Formateur } from 'src/app/entities/formateur.model';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Inscription } from 'src/app/entities/inscription.model';
@Component({
  selector: 'app-dash-app',
  templateUrl: './dash-app.component.html',
  styleUrls: ['./dash-app.component.css']
})
export class DashAppComponent {
  constructor(public formateurService: formateurService, public SessionFormationService: SessionFormationService, public ThemeDeFormationService: ThemeDeFormationService, private contService: ContactService, private formBuilder: FormBuilder, private appService: ApprenantService, private UserServ: UserService, private modalService: BsModalService, private datePipe: DatePipe, private fb: FormBuilder,
    public actualiteService: ActualiteService, private InscriptionService :  InscriptionService  ,private authService: AuthService) {
    this.contactForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  public UserId!: string | null;
  public idUser!: number;
  public contactForm: FormGroup;
  public legthInscr!: number;
  public Actualites!: Actualite[];
  public actualite!: Actualite;
  public apprenant!: Apprenant;
  //public user!:User;
  public sessionFormations!: SessionFormation[];
  public sessionFormation!: SessionFormation;
  public numberOfSession!: number;
  public themeDeFormations!: ThemeDeFormation[];
  public themeDeFormation!: ThemeDeFormation;
  public formateurs!: Formateur[];
  public formateur!: Formateur;
  public Inscriptions!: Inscription[];
  
  public Inscription!: Inscription;
  user: User = {
    id: 0,
    email: '',
    password: '',
    role: Role.User, // Set default role value to empty string
    verified: false,
    archive: false,
    nom: '',
    prenom: '',
    tel: ''

  };

  getApprenantId() {
    /*   this.appService.getApprenantId(this.user.id).subscribe(response => {
    console.log('apprenant',response)
    
    }) */
  }

  getSessionFormation() {

    this.SessionFormationService.getSessionFormation().subscribe(response => {
      console.log("session",response);

      this.sessionFormations = response;
      this.numberOfSession = response.length;
    });
    this.formateurService.getFormateur().subscribe(response => {
      console.log(response);

      this.formateurs = response;

    });
    this.ThemeDeFormationService.getThemeDeFormation().subscribe(response => {
      console.log(response);

      this.themeDeFormations = response;

    });


  }

  getInsecription() {
   

    this.InscriptionService.getInscription().subscribe((response:any[]) => {

     


       response.forEach((item) => {
        const date=new Date(item.sessionFormation.dateDebut);
        
        
        const dayOfWeek = date.getDay(); 
        item.sessionFormation.dayOfWeek = this.getDayName(dayOfWeek);

      item.sessionFormation.dateDebut = this.datePipe.transform(date, 'dd MMMM yyyy')??"";
      

      const dateF=new Date(item.sessionFormation.dateFin);
      item.sessionFormation.dateFin = this.datePipe.transform(dateF, 'dd MMMM yyyy')??"";
       });
       
       this.Inscriptions = response.filter(inscri => inscri.apprenant.id === this.idUser); //nafsha f html 
this.legthInscr=this.Inscriptions.length;

       console.log(this.Inscriptions)
     

    });


  }

  userLog() {
    this.authService.getUserByEmail(this.authService.loggedUser).subscribe((user: User) => {
      this.user.role = user.role;
      this.user.id = user.id;
      this.user.verified = user.verified;
      this.user.archive = user.archive;
      this.user.nom = user.nom;
      this.user.prenom = user.prenom;
      this.user.tel = user.tel;
      this.user.email = user.email;

      console.log('User detail:', user);

      this.contactForm.patchValue({
        nom: this.user.nom,
        prenom: this.user.prenom,
        email: this.user.email,
        numTel: this.user.tel
      });

      this.appService.getApprenantId(user.id).subscribe(response => {
        console.log('apprenant', response)

        this.apprenant = response;
      })
    })


  }


  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  onTableChange(event: any) {
    this.page = event;
    this.getActualite();

  }

  getActualite() {
    this.actualiteService.getActualite().subscribe((response: any[]) => {


      //filtrer les donnés avec date descendant
      this.Actualites = response.sort((a, b) => new Date(b.dateActualite).getTime() - new Date(a.dateActualite).getTime());


      response.forEach((item) => {
        const date = new Date(item.dateActualite);


        const dayOfWeek = date.getDay();
        item.dayOfWeek = this.getDayName(dayOfWeek);

        item.dateActualite = this.datePipe.transform(date, 'dd MMMM yyyy') ?? "";

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
    this.userLog();
    this.getActualite();
    this.getApprenantId();
    this.getSessionFormation();
    console.log(this.authService.getToken())
    console.log('User detail 4:', this.user);

    this.UserId = localStorage.getItem('UserId');
    this.idUser = Number(this.UserId)
    this.getInsecription();
  }


  onSubmit() {
    if (this.contactForm.invalid) {
      // Handle form validation errors
      return;
    }

    // Access the form values
    const formValues = this.contactForm.value;
    console.log(formValues);
    this.contService.ajoutCon(formValues).subscribe(response => {
      console.log(response);
    })
    window.location.reload();
    // Perform the form submission logic
    // ...
  }
}
