import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashFormateurComponent } from 'src/app/pages/formateur-pages/dash-formateur/dash-formateur.component';

const routes: Routes = [
  { path: 'dash-for', component: DashFormateurComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormateurLayoutRoutingModule { }
