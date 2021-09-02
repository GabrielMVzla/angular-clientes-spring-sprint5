import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './cliente-layout/navbar/navbar.component';
import { LoginComponent } from './usuarios/login.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { ClientesComponent } from './cliente/clientes-table/clientes.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent
  // },
  {path: '', component: HomeComponent }, //home -> página principal, para hacer match completo con la url: full
  {path: 'home', component: HomeComponent },
  {path: 'clientes/page/:page', component: ClientesComponent},
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: '', 
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
