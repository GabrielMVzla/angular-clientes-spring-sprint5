import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './usuarios/login.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { AdminGuard } from './guard-log/admin.guard'


const routes: Routes = [
  // {
  //   path: '',
  //   component: LoginComponent
  // },
  { path: '', component: HomeComponent }, //home -> página principal, para hacer match completo con la url: full
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'clientes',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cliente/user-form.module').then(module => module.UserFormModule)
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
