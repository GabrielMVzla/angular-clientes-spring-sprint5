import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from '../../cliente/clientes-table/cliente';
import { AutenticacionService } from '../../usuarios/autenticacion.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClientesService 
{
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders ({'Content-Type': 'application/json'});

  constructor(
     private http: HttpClient,
     private router: Router, 
     private autenticacionService: AutenticacionService
     ) {}

  private agregarAuthorizationHeader(){
    let token = this.autenticacionService.token;
    if(token != null)
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    return this.httpHeaders;
  }
  

  getClientes(){
    return this.http.get<Cliente[]>(`${environment.urlEndPoint}/clientes`, 
      {headers: this.agregarAuthorizationHeader()});
  }
  getCliente(id: number){
    return this.http.get<Cliente[]>(`${environment.urlEndPoint}/cliente/${id}`, 
      {headers: this.agregarAuthorizationHeader()});
  }

  postClientes(cliente: Cliente){
    return this.http.post<Cliente[]>(`${environment.urlEndPoint}/cliente`, cliente, 
      {headers: this.agregarAuthorizationHeader()})    
  }

  deleteCliente(id: number){
    return this.http.delete(`${environment.urlEndPoint}/cliente/${id}`, 
      {headers: this.agregarAuthorizationHeader()})
  }

  putCliente(id: number, cliente: Partial <Cliente>){
    return this.http.put(`${environment.urlEndPoint}/cliente/${id}`, cliente, 
      {headers: this.agregarAuthorizationHeader()})

  }
  getClientesPaginable(page: number): Observable<any>
  {
    return this.http.get<any>(`${this.urlEndPoint}/page/${page}`, {headers: this.agregarAuthorizationHeader()});
  }

}
