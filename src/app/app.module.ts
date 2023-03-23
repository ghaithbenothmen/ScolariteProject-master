import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

import { NgModule } from '@angular/core';
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
import { DepartementComponent } from './pages/formateur/formateur.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
    declarations: [
        AppComponent,
       
        NavbarComponent,
       
        SideNavComponent,
        
        PresentationComponent,
        NavbarComponent,
       
        AdminLayoutComponent,
       AuthLayoutComponent,
       DepartementComponent

        
        
    ],
    providers: [BsModalService],
    bootstrap: [AppComponent],
    imports: [
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
