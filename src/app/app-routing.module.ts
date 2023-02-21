import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ApprenantComponent } from './apprenant/apprenant.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
 
  {path:"login",component:LoginComponent},
  {path:"apprenant",component:ApprenantComponent,canActivate: [AuthGuard]},
  {path:"etablissement",component:EtablissementComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
