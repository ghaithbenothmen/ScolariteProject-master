import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeanceComponent } from 'src/app/pages/formateur-pages/seance/seance.component';
import { DashFormateurComponent } from 'src/app/pages/formateur-pages/dash-formateur/dash-formateur.component';
import { SessionFormComponent } from 'src/app/pages/formateur-pages/session-form/session-form.component';

const routes: Routes = [
  { path: 'dash-for', component: DashFormateurComponent },
  { path: 'Seance-Formation/:id', component: SeanceComponent},
  { path: 'session-for', component: SessionFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormateurLayoutRoutingModule { }
