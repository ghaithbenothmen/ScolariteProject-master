
import { ActualiteComponent } from './../../pages/actualite/actualite.component';
import { AccueilComponent } from '../../pages/accueil/accueil.component';
import { PresentationComponent } from '../../pages/presentation/presentation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ActuPageComponent } from 'src/app/pages/actu-page/actu-page.component';

const routes: Routes = [
  { path: 'login',          component: LoginComponent },
  { path: 'presentation',          component: PresentationComponent },
  { path: 'accueil',          component: AccueilComponent },
  { path: 'actu',          component: ActuPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
