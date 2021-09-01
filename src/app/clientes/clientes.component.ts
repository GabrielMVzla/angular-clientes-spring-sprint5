import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  constructor(private clientesService: ClientesService, private activatedRoute: ActivatedRoute) 
  {
    // this.clientesService.getClientes().subscribe(r => this.clientes = r);
  }

  paginador: any;

  clientes: Cliente[];

  ngOnInit(): void {

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

}
