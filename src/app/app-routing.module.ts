
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ApprenantLayoutComponent } from './layout/apprenant-layout/apprenant-layout.component';
import { Role } from './entities/role.model';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full',
  }, 
  {
    canActivate: [AuthGuard],
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    
    path: '',
    component: ApprenantLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layout/apprenant-layout/apprenant-layout.module').then(m => m.ApprenantLayoutModule)
      }
    ]
  },
   {
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
