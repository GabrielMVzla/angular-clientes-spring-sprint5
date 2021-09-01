import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { MatDialog } from '@angular/material/dialog';
import { ClientesService } from '../../core/service/clientes.service';
import { FormClienteComponent } from '../form-cliente/form-cliente.component';
import { AutenticacionService } from 'src/app/usuarios/autenticacion.service';
import { ActivatedRoute } from '@angular/router';


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
    private autenticacionService: AutenticacionService,
    private activatedRoute: ActivatedRoute
    ) {}


  ngOnInit(): void {
    this.allClientes();
    this.showAction();
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
          console.log(this.paginador);
          
        }
      )
    });
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
