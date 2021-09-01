import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../core/service/clientes.service';
import { Cliente } from '../clientes-table/cliente';



@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  public dec: number;
  public id: number;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private clientesService: ClientesService
  ) {
    this.buildForm();

  }

  ngOnInit(): void {
    if (this.dec === 2) {
      this.clientesService.getCliente(this.id).subscribe(response => {
        this.form.patchValue(response)
      })
    }
    
  }


  saveCliente(e: Event) {
    e.preventDefault();
    if (this.dec === 1) {
      this.clientesService.postClientes(this.form.value).subscribe(response => {
        console.log(response);

      })
    }
    if (this.dec === 2) {
      this.clientesService.putCliente(this.id, this.form.value).subscribe(response => {
        console.log(response);
      })
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      idCliente: [null, [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    })
  }

}
