import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/usuarios/autenticacion.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private autenticacionService: AutenticacionService

  ) { }

  ngOnInit(): void {
  }

  logOut(){
    this.autenticacionService.logout();
  }

}
