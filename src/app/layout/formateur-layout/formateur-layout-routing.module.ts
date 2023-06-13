import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeanceComponent } from 'src/app/pages/formateur-pages/seance/seance.component';
import { DashFormateurComponent } from 'src/app/pages/formateur-pages/dash-formateur/dash-formateur.component';
import { SessionFormComponent } from 'src/app/pages/formateur-pages/session-form/session-form.component';
import { ApprenantSessComponent } from 'src/app/pages/formateur-pages/apprenant-sess/apprenant-sess.component';
import { EditFormateurComponent } from 'src/app/pages/formateur-pages/edit-formateur/edit-formateur.component';
import { SeanceDetailsComponent } from 'src/app/pages/formateur-pages/seance-details/seance-details.component';

const routes: Routes = [
  { path: 'dash-for', component: DashFormateurComponent },
  { path: 'Seance-Formation/:id', component: SeanceComponent},
  { path: 'session-for', component: SessionFormComponent},
  { path: 'apprenant-sess/:id', component: ApprenantSessComponent},
  { path: 'edit-profil', component: EditFormateurComponent},
  { path: 'seance-details/:id', component: SeanceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormateurLayoutRoutingModule { }
