import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../usuarios/autenticacion.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  title:string = 'App Angular'

  constructor(public authService: AutenticacionService, private router: Router){  }

  logout(): void{
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Has cerrado sesión con éxito!, ${username}`, 'success');
    this.router.navigate(['/login']);
  }

}
