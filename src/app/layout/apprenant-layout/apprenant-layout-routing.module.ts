import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from 'src/app/pages/apprenant-pages/inscription/inscription.component';
import { SessionComponent } from 'src/app/pages/apprenant-pages/session/session.component';

const routes: Routes = [
  { path: 'inscri/:id', component: InscriptionComponent },
    { path: 'ListeSession',         component: SessionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprenantLayoutRoutingModule { }
