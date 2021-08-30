import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' }, //home -> página principal, para hacer match completo con la url: full

  {path: 'login', component: LoginComponent},
  // {path: 'clientes', component: ClientesComponent},
  {path: 'home', component: HomeComponent},
  {path: 'clientes/page/:page', component: ClientesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
