import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes-table/clientes.component';
import {AdminGuard} from '../guard-log/admin.guard'


const routes: Routes = [
  {
    path: 'clientes/page/:page',
    canActivate: [AdminGuard],
    component: ClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFormRoutingModule { }
