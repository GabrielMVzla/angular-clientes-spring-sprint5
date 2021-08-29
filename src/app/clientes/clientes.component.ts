import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  constructor(private clientesService: ClientesService) 
  {
    this.clientesService.getClientes().subscribe(r => this.clientes = r);
  }

  clientes: Cliente[];

  ngOnInit(): void {
  }

}
