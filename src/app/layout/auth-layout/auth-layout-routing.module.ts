
import { ActualiteComponent } from './../../pages/admin-pages/actualite/actualite.component';
import { AccueilComponent } from '../../pages/auth-pages/accueil/accueil.component';
import { PresentationComponent } from '../../pages/auth-pages/presentation/presentation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { ActuPageComponent } from 'src/app/pages/auth-pages/actu-page/actu-page.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { AffichageThemeDeFormationComponent } from 'src/app/pages/auth-pages/affichage-theme-de-formation/affichage-theme-de-formation.component';
import { AffichagesessionDeFormationComponent } from 'src/app/pages/auth-pages/affichagesession-de-formation/affichagesession-de-formation.component';

const routes: Routes = [
  { path: 'login',          component: LoginComponent },
  { path: 'register',          component: RegisterComponent },
  { path: 'presentation',          component: PresentationComponent },
  { path: 'accueil',          component: AccueilComponent },
  { path: 'actu', component: ActuPageComponent },
  { path: 'AffichagethemeFormation', component: AffichageThemeDeFormationComponent },
   { path: 'AffichagesessionFormation', component: AffichagesessionDeFormationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
