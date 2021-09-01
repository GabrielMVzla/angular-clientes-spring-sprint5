import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-no-found',
  templateUrl: './page-no-found.component.html'
})
export class PageNoFoundComponent implements OnInit {

  url = '../../assets/1_light.jpg'

  constructor() { }

  ngOnInit(): void {
  }

}
