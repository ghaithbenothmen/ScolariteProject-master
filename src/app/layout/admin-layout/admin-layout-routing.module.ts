import { MessagesComponent } from './../../pages/admin-pages/messages/messages.component';
import {  FormateurComponent } from '../../pages/admin-pages/formateur/formateur.component';
import { EtablissementComponent } from '../../pages/admin-pages/etablissement/etablissement.component';
import { ApprenantComponent } from '../../pages/admin-pages/apprenant/apprenant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeDeFormationComponent } from '../../pages/admin-pages/theme-de-formation/theme-de-formation.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ActualiteComponent } from 'src/app/pages/admin-pages/actualite/actualite.component';
import { SessionFormation } from 'src/app/entities/SessionFormation.model';
import { SessionFormationComponent } from '../../pages/admin-pages/session-formation/session-formation.component';

const routes: Routes = [
 
  { path: 'apprenant',         component: ApprenantComponent },
  { path: 'etablissement',  component: EtablissementComponent },
  { path: 'formateur',  component: FormateurComponent },
  { path: 'actualiteDash', component: ActualiteComponent },
  { path: 'themeDeFormation', component: ThemeDeFormationComponent },
   {path:'sessionDeFormation',component:SessionFormationComponent},
   {path:'messages',component:MessagesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
