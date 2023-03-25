import { FormateurComponent } from './pages/formateur/formateur.component';
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
import { EtablissementComponent } from './pages/etablissement/etablissement.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PresentationComponent } from './pages/presentation/presentation.component';


import { ApprenantComponent } from './pages/apprenant/apprenant.component';
import localeFr from '@angular/common/locales/fr';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ActualiteComponent } from './pages/actualite/actualite.component';
import { ActuPageComponent } from './pages/actu-page/actu-page.component';
import { FooterComponent } from './footer/footer.component';

import { ThemeDeFormationComponent } from './pages/theme-de-formation/theme-de-formation.component';


import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);



@NgModule({
    declarations: [
        AppComponent,
        
        NavbarComponent,
       
        SideNavComponent,
        
        PresentationComponent,
        NavbarComponent,
       
        AdminLayoutComponent,
       AuthLayoutComponent,
       FormateurComponent,
       ActualiteComponent,
       ActuPageComponent,
       FooterComponent,
       ThemeDeFormationComponent

        
        
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
