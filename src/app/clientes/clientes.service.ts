import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from './cliente';
import { AutenticacionService } from '../usuarios/autenticacion.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService 
{
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders ({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private router: Router, private autenticacionService: AutenticacionService) {}

  private agregarAuthorizationHeader()
  {
    let token = this.autenticacionService.token;
    if(token != null)
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);

    return this.httpHeaders;
  }
  
  getClientes(): Observable<Cliente[]>
  {
    return this.http.get<Cliente[]>(`${this.urlEndPoint}`, {headers: this.agregarAuthorizationHeader()});
  }

  getClientesPaginable(page: number): Observable<any>
  {
    return this.http.get<any>(`${this.urlEndPoint}/page/${page}`, {headers: this.agregarAuthorizationHeader()});
  }

}
