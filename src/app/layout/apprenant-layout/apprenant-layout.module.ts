import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprenantLayoutRoutingModule } from './apprenant-layout-routing.module';
import { ApprenantLayoutComponent } from './apprenant-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscriptionComponent } from 'src/app/pages/apprenant-pages/inscription/inscription.component';


@NgModule({
  declarations: [
    InscriptionComponent
  ],
  imports: [
    CommonModule,
    ApprenantLayoutRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ApprenantLayoutModule { }
