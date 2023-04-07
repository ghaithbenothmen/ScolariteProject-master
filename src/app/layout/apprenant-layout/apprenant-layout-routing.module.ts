import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from 'src/app/pages/apprenant-pages/inscription/inscription.component';

const routes: Routes = [
  { path: 'inscri',         component: InscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprenantLayoutRoutingModule { }
