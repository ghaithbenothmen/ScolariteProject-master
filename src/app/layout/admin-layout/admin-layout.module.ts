import { EtablissementComponent } from '../../pages/admin-pages/etablissement/etablissement.component';

import { ApprenantComponent } from '../../pages/admin-pages/apprenant/apprenant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccueilComponent } from '../../pages/auth-pages/accueil/accueil.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormateurArchiveComponent } from 'src/app/pages/admin-pages/formateur-archive/formateur-archive.component';


@NgModule({
  declarations: [
    ApprenantComponent,
    FormateurArchiveComponent,
    EtablissementComponent,
    AccueilComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminLayoutModule { }
