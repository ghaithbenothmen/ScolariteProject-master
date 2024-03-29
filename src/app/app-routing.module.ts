
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ApprenantLayoutComponent } from './layout/apprenant-layout/apprenant-layout.component';
import { Role } from './entities/role.model';
import { FormateurLayoutComponent } from './layout/formateur-layout/formateur-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  }, 
  {
    canActivate: [AuthGuard],
    path: 'admin-dashboard',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    canActivate: [AuthGuard],
    path: 'user-dashboard',
    component: ApprenantLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/layout/apprenant-layout/apprenant-layout.module').then(m => m.ApprenantLayoutModule)
      }
    ]
  },
  {
    canActivate: [AuthGuard],
    path: 'formateur-dashboard',
    component: FormateurLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/layout/formateur-layout/formateur-layout.module').then(m => m.FormateurLayoutModule)
      }
    ]
  },
  
   {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app/layout/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule),

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
