import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApprenantComponent } from './apprenant/apprenant.component';
import { ModalCompComponent } from './modal-comp/modal-comp.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { SideNavComponent } from './side-nav/side-nav.component';
import { EtablissementComponent } from './etablissement/etablissement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ApprenantComponent,
    ModalCompComponent,
    SideNavComponent,
    EtablissementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule     
    
  ],
  providers: [BsModalService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
