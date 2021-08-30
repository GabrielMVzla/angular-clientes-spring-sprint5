import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';
import { Usuario } from './usuario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor, Sign In!";
  usuario: Usuario;

  constructor(private autenticacionService: AutenticacionService, private router: Router) { this.usuario = new Usuario();}

  ngOnInit(): void 
  {
    if(  this.autenticacionService.isAuthenticated() )
    {
      swal.fire('Login', `Hola ${this.autenticacionService.usuario.username}, ya estás autenticado!`, 'info')
      this.router.navigate(['/clientes'])
    }
  }

  login(): void
  {
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null)
    {
      swal.fire('Error Login', 'Username o Password vacías!', 'error');
      return;
    }
      this.autenticacionService.login(this.usuario).subscribe(response => {
          this.autenticacionService.guardarUsuario(response.access_token);
          this.autenticacionService.guardarToken(response.access_token);
    
          let usuario = this.autenticacionService.usuario;
    
          this.router.navigate(['/clientes']);
          swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success')
        },
        err => {
          if(err.status == 400){
            swal.fire('Error Login', `Usuario o Contraeña Incorrectas!`, 'error')
          }
    });
  }
}
