import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { InscriptionComponent } from 'src/app/pages/apprenant-pages/inscription/inscription.component';
import { SessionInseritComponent } from 'src/app/session-inserit/session-inserit.component';


import { SessionComponent } from 'src/app/pages/apprenant-pages/session/session.component';

const routes: Routes = [
  { path: 'inscri/:id', component: InscriptionComponent },
  { path: 'ListeSession', component: SessionComponent },
    { path: 'Session-Insecrit', component: SessionInseritComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprenantLayoutRoutingModule { }
