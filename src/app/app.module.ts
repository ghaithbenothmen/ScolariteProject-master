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
import { FooterComponent } from './footer/footer.component';

import { ThemeDeFormationComponent } from './pages/admin-pages/theme-de-formation/theme-de-formation.component';


import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { SessionFormationComponent } from './pages/admin-pages/session-formation/session-formation.component';
import { RegisterComponent } from './pages/register/register.component';
import { SideAppComponent } from './components/side-app/side-app.component';
import { ApprenantLayoutComponent } from './layout/apprenant-layout/apprenant-layout.component';
import { InscriptionComponent } from './pages/apprenant-pages/inscription/inscription.component';
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
       

        
        
    ],
    providers: [BsModalService,DatePipe,{ provide: LOCALE_ID, useValue: 'fr' }],
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
        CollapseModule.forRoot()
    ]
})
export class AppModule { }
