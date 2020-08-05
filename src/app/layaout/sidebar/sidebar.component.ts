import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  anio;

  constructor() {
    this.anio = new Date().getFullYear();
   }

  ngOnInit(): void {
  }

}
