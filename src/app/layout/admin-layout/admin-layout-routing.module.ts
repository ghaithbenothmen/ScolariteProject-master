import { MessagesComponent } from './../../pages/admin-pages/messages/messages.component';
import {  FormateurComponent } from '../../pages/admin-pages/formateur/formateur.component';
import { EtablissementComponent } from '../../pages/admin-pages/etablissement/etablissement.component';
import { ApprenantComponent } from '../../pages/admin-pages/apprenant/apprenant.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeDeFormationComponent } from '../../pages/admin-pages/theme-de-formation/theme-de-formation.component';
import { ActualiteComponent } from 'src/app/pages/admin-pages/actualite/actualite.component';
import { SessionFormationComponent } from '../../pages/admin-pages/session-formation/session-formation.component';
import { AppBySessionComponent } from 'src/app/pages/admin-pages/app-by-session/app-by-session.component';
import { ListeAppSessionComponent } from 'src/app/pages/admin-pages/liste-app-session/liste-app-session.component';


import { AdminDashComponent } from 'src/app/pages/admin-pages/admin-dash/admin-dash.component';
import { ApprenantArchComponent } from 'src/app/pages/admin-pages/apprenant-arch/apprenant-arch.component';
import { FormateurArchiveComponent } from 'src/app/pages/admin-pages/formateur-archive/formateur-archive.component';
import { EditProfilAdminComponent } from 'src/app/pages/admin-pages/edit-profil-admin/edit-profil-admin.component';
import { SeanceComponent } from 'src/app/pages/formateur-pages/seance/seance.component';
import { ListeSeanceComponent } from 'src/app/pages/admin-pages/liste-seance/liste-seance.component';
import { PresanceAppComponent } from 'src/app/pages/admin-pages/presance-app/presance-app.component';




const routes: Routes = [
 
  { path: 'apprenant',         component: ApprenantComponent },
  { path: 'apprenantArch',         component: ApprenantArchComponent },
  { path: 'etablissement',  component: EtablissementComponent },
  { path: 'formateur', component: FormateurComponent },
  { path: 'formateur-archive',  component: FormateurArchiveComponent },
  { path: 'actualiteDash', component: ActualiteComponent },
  { path: 'themeDeFormation', component: ThemeDeFormationComponent },
  {path:'sessionDeFormation',component:SessionFormationComponent},
  { path: 'messages', component: MessagesComponent },
  { path: 'app-liste-app-by-session', component: AppBySessionComponent },

  { path: 'edit_profil', component:EditProfilAdminComponent},
 {path: 'liste-seance-by-session/:id',component: ListeSeanceComponent},
  { path: 'ListeAppSession/:id', component: ListeAppSessionComponent },
  {path:'Presance/:id', component:PresanceAppComponent},

  { path: 'admin-dash', component: AdminDashComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
