import {  FormateurComponent } from '../../pages/formateur/formateur.component';
import { EtablissementComponent } from './../../pages/etablissement/etablissement.component';
import { ApprenantComponent } from '../../pages/apprenant/apprenant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeDeFormationComponent } from '../../pages/theme-de-formation/theme-de-formation.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ActualiteComponent } from 'src/app/pages/actualite/actualite.component';

const routes: Routes = [
 
  { path: 'apprenant',         component: ApprenantComponent },
  { path: 'etablissement',  component: EtablissementComponent },
  { path: 'formateur',  component: FormateurComponent },
  { path: 'actualiteDash', component: ActualiteComponent },
  {path:'themeDeFormation',component:ThemeDeFormationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
