import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './cliente-layout/navbar/navbar.component';
import { LoginComponent } from './usuarios/login.component';
import {AdminGuard} from './guard-log/admin.guard'
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent
  // },
  {path: '', redirectTo: 'home', pathMatch: 'full' }, //home -> página principal, para hacer match completo con la url: full
  {path: 'clientes/page/:page', component: ClientesComponent},
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'clientes', 
    canActivate: [AdminGuard],
    component: NavbarComponent,
    children:[
      {
        path: '',
        loadChildren: () => import ('./cliente/user-form.module').then(module => module.UserFormModule)
      }
    ]
  },
  {
    path: '**',
    component: PageNoFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
