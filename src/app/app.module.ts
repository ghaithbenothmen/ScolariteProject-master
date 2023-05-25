import { FormateurComponent } from './pages/admin-pages/formateur/formateur.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { EtablissementComponent } from './pages/admin-pages/etablissement/etablissement.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PresentationComponent } from './pages/auth-pages/presentation/presentation.component';


import { ApprenantComponent } from './pages/admin-pages/apprenant/apprenant.component';
import localeFr from '@angular/common/locales/fr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ActualiteComponent } from './pages/admin-pages/actualite/actualite.component';
import { ActuPageComponent } from './pages/auth-pages/actu-page/actu-page.component';
import { FooterComponent } from './components/footer/footer.component';

import { ThemeDeFormationComponent } from './pages/admin-pages/theme-de-formation/theme-de-formation.component';


import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { SessionFormationComponent } from './pages/admin-pages/session-formation/session-formation.component';
import { RegisterComponent } from './pages/register/register.component';
import { SideAppComponent } from './components/side-app/side-app.component';
import { ApprenantLayoutComponent } from './layout/apprenant-layout/apprenant-layout.component';
import { InscriptionComponent } from './pages/apprenant-pages/inscription/inscription.component';

import { AffichageThemeDeFormationComponent } from './pages/auth-pages/affichage-theme-de-formation/affichage-theme-de-formation.component';
import { AffichagesessionDeFormationComponent } from './pages/auth-pages/affichagesession-de-formation/affichagesession-de-formation.component';

import { RegisterInfoComponent } from './pages/register-info/register-info.component';
import { ContactComponent } from './pages/auth-pages/contact/contact.component';
import { MessagesComponent } from './pages/admin-pages/messages/messages.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { AuthGuard } from './guard/auth.guard';
import { ProfilComponent } from './pages/profil/profil.component';
import { SessionComponent } from './pages/apprenant-pages/session/session.component';
import { SessionInseritComponent } from './pages/apprenant-pages/session-inserit/session-inserit.component';
import { AppBySessionComponent } from './pages/admin-pages/app-by-session/app-by-session.component';
import { ListeAppSessionComponent } from './pages/admin-pages/liste-app-session/liste-app-session.component';
import { FormateurLayoutComponent } from './layout/formateur-layout/formateur-layout.component';
import { SideForComponent } from './components/side-for/side-for.component';

import { SeanceComponent } from './pages/formateur-pages/seance/seance.component';

import { NavbarForComponent } from './components/navbar-for/navbar-for.component';



import { CDBFreeModule } from 'ng-cdbangular';
import { DashFormateurComponent } from './pages/formateur-pages/dash-formateur/dash-formateur.component';
import { AdminDashComponent } from './pages/admin-pages/admin-dash/admin-dash.component';
import { SessionFormComponent } from './pages/formateur-pages/session-form/session-form.component';
import { ApprenantSessComponent } from './pages/formateur-pages/apprenant-sess/apprenant-sess.component';
import { SeanceAppComponent } from './pages/apprenant-pages/seance-app/seance-app.component';
import { EditProfilComponent } from './pages/apprenant-pages/edit-profil/edit-profil.component';



registerLocaleData(localeFr);



@NgModule({
    declarations: [
        AppComponent,
        
        NavbarComponent,
       
        SideNavComponent,
        
        PresentationComponent,
        NavbarComponent,
       ActualiteComponent,
        AdminLayoutComponent,
       AuthLayoutComponent,
       ApprenantLayoutComponent,
       FormateurComponent,
      
       ActuPageComponent,
       FooterComponent,
       ThemeDeFormationComponent,
       SessionFormationComponent,
       RegisterComponent,
       SideAppComponent,

       AffichageThemeDeFormationComponent,
       AffichagesessionDeFormationComponent,

       RegisterInfoComponent,
         ContactComponent,
         MessagesComponent,

         ProfilComponent,

         SessionComponent,
          SessionInseritComponent,
          AppBySessionComponent,
          ListeAppSessionComponent,
          FormateurLayoutComponent,
          SideForComponent,

          SeanceComponent,

          NavbarForComponent,
          DashFormateurComponent,
          AdminDashComponent,
          SessionFormComponent,
          ApprenantSessComponent,
          SeanceAppComponent,
          EditProfilComponent,

      


       

        
        
    ],
    providers: [BsModalService,AuthGuard,DatePipe,{ provide: LOCALE_ID, useValue: 'fr' }],
    bootstrap: [AppComponent],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        BrowserModule,
        AppRoutingModule,
       NgbModule, NgbModule,
        ModalModule.forRoot(),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CollapseModule.forRoot(),
        NgxPaginationModule,
        CDBFreeModule
    ]
})
export class AppModule { }
