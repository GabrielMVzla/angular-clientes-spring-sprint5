import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { MatDialog } from '@angular/material/dialog';
import { ClientesService } from '../../core/service/clientes.service';
import { FormClienteComponent } from '../form-cliente/form-cliente.component';
import { AutenticacionService } from 'src/app/usuarios/autenticacion.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  paginador: any;

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog,
    public autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute
    ) {}


  ngOnInit(): void {
    this.clientesPaginables();    
   
  }
  clientesPaginables(){
    this.activatedRoute.paramMap.subscribe( params => {
      let page:number = 0;
     
      let algo: any = params.get('page');

      if(algo != null)
        page = +algo; //el operador de " + " convierte automaticamente un String a numérico
      else page = 0;

      this.clientesService.getClientesPaginable(page).subscribe(
        response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        }
      )
    });
  }

  openDialog(dec: number, id: number){
    const dialogRef = this.dialog.open(FormClienteComponent);
    dialogRef.componentInstance.dec = dec;
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe( response => {
      this.clientesPaginables();
    } )
  }

  deleteCliente(id: number){
    swal.fire({
      title: '¿Estás seguro?',
      text: `Estás eliminando al usuario con ID ${id}, no podrás revertir esta acción!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed)
      {
        this.clientesService.deleteCliente(id).subscribe(response =>{
         
          this.clientesPaginables();
          swal.fire(
                'Cliente Eliminado!',
                `Eliminado con Exito.`,
                'success'
              )
            }
          )
      }
    })
    

  }

  showAction(){
   return this.autenticacionService.hasRole('ROLE_ADMIN')
    
  }
}
