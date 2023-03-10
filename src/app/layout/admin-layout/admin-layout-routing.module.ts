import { DepartementComponent } from './../../pages/departement/departement.component';
import { EtablissementComponent } from './../../pages/etablissement/etablissement.component';
import { ApprenantComponent } from '../../pages/apprenant/apprenant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'src/app/pages/login/login.component';

const routes: Routes = [
  
  { path: 'apprenant',         component: ApprenantComponent },
  { path: 'etablissement',  component: EtablissementComponent },
  { path: 'departement',  component: DepartementComponent },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
