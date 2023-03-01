import { PresentationComponent } from './pages/presentation/presentation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { EtablissementComponent } from './pages/etablissement/etablissement.component';
import { AuthGuard } from './guard/auth.guard';
import { ApprenantComponent } from './pages/apprenant/apprenant.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'apprenant',
    pathMatch: 'full',
  }, {
    canActivate: [AuthGuard],
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layout/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),
        
      }
    ]
  }, {
    path: '**',
    redirectTo: 'accueil'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
