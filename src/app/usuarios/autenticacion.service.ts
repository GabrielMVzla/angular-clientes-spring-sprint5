import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService 
{
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient,private router: Router){this._usuario = new Usuario();}

  public get usuario(): Usuario
  {
    if(sessionStorage.getItem('usuario'))
    {
      this._usuario = JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('usuario')))) as Usuario;
      return this._usuario;
    }
  
    else    if(this._usuario.username.length > 0)
    {
      // console.log("aquí andamos antes");  
      return this._usuario;
    } 
    return new Usuario();
  }

  public get token(): string
  {
    if(this._token && this._token.length > 0)
      return this._token;
    else if(this._token == null && sessionStorage.getItem('token'))
    {
      this._token = sessionStorage.getItem('token') as string;
      return this._token;
    }
    return '';
  }

  login(usuario: Usuario): Observable<any> //string
  {
    const urlEndpoint = 'http://localhost:8080/oauth/token'; //url de donde optenemos el token
    const credenciales = btoa('angularapp' + ':' + '12345');//credenciales de la aplicación angular
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                         'Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }
  obtenerDatosToken(accessToken: string): any
  {
    if(accessToken && accessToken.length > 0)
    {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  guardarUsuario(accessToken: string): void
  {
    let payload = this.obtenerDatosToken(accessToken);

    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));// de JavaScript, parse convierte String a obj JSON y el stringify hace lo contrario
  }
  guardarToken(accessToken: string): void
  {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  isAuthenticated(): boolean
  {
    let payload = this.obtenerDatosToken(this.token);//sin _token, porque obtenemos desde el get

    if(payload != null && payload.user_name && payload.user_name.length > 0)
    {
      return true;
    }

    return false;
  }

  hasRole(role: string): boolean
  {
    if(this.usuario.roles.includes(role))
    {
      return true;
    }
    return false;
  }

  logout(): void
  {
    this._token = "";
    this._usuario = new Usuario();

    //eliminamos de la sesión la infromación de autenticación del usuario, puede ser de esta manera 1 x 1, o eliminar todo con clear();
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    // sessionStorage.clear();
    this.router.navigate(["login"]);
  }

}
