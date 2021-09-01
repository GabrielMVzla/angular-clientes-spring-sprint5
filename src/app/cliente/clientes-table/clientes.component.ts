import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { MatDialog } from '@angular/material/dialog';
import { ClientesService } from '../../core/service/clientes.service';
import { FormClienteComponent } from '../form-cliente/form-cliente.component';
import { AutenticacionService } from 'src/app/usuarios/autenticacion.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];


  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog,
    private autenticacionService: AutenticacionService
    ) {}


  ngOnInit(): void {
    this.allClientes();
    this.showAction();
  }


  openDialog(dec: number, id: number){
    const dialogRef = this.dialog.open(FormClienteComponent);
    dialogRef.componentInstance.dec = dec;
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe( response => {
      this.allClientes();
    } )
  }

  allClientes(){
    this.clientesService.getClientes().subscribe(r =>{
      this.clientes = r
      console.log(this.clientes);
      
    } );
  }

  deleteCliente(id: number){
    this.clientesService.deleteCliente(id).subscribe(response =>{
      console.log(response);
      this.allClientes();
    })
  }

  showAction(){
   return this.autenticacionService.hasRole('ROLE_ADMIN')
    
  }
}
