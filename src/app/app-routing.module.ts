import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './usuarios/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
