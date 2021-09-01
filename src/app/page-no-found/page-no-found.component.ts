import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-no-found',
  templateUrl: './page-no-found.component.html',
  styleUrls: ['./page-no-found.component.css']
})
export class PageNoFoundComponent implements OnInit {

  url = '../../assets/1_light.jpg'

  constructor() { }

  ngOnInit(): void {
  }

}
