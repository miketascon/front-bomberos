import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  anio;

  constructor(public authService: AuthService) {
    this.anio = new Date().getFullYear();
   }

  ngOnInit(): void {
  }

}
