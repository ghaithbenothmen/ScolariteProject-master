import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfilComponent } from 'src/app/pages/apprenant-pages/edit-profil/edit-profil.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { InscriptionComponent } from 'src/app/pages/apprenant-pages/inscription/inscription.component';
import { SeanceAppComponent } from 'src/app/pages/apprenant-pages/seance-app/seance-app.component';
import { SessionInseritComponent } from 'src/app/pages/apprenant-pages/session-inserit/session-inserit.component';


import { SessionComponent } from 'src/app/pages/apprenant-pages/session/session.component';
import { ApprenantSessComponent } from 'src/app/pages/formateur-pages/apprenant-sess/apprenant-sess.component';

const routes: Routes = [
  { path: 'inscri/:id', component: InscriptionComponent },
  { path: 'ListeSession', component: SessionComponent },
    { path: 'Session-Insecrit', component: SessionInseritComponent},
    { path: 'Seance-app/:id', component: SeanceAppComponent},
    { path: 'edit-profil', component: EditProfilComponent},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprenantLayoutRoutingModule { }
