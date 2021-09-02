import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormRoutingModule } from './user-form-routing.module';
import { ClientesComponent } from './clientes-table/clientes.component';
import { MaterialModule } from '../material/material.module';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginacionComponent } from './paginacion/paginacion.component';

@NgModule({
  declarations: [
    ClientesComponent,
    FormClienteComponent,
    PaginacionComponent
  ],
  imports: [
    CommonModule,
    UserFormRoutingModule,
    MaterialModule,
    ReactiveFormsModule,

  ]
})
export class UserFormModule { }
