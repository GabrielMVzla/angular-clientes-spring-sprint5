import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from './usuarios/autenticacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientes-spring-sprint5';

  constructor(private authService: AutenticacionService, private router: Router){}

  logout()
  {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
