import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { MessageService} from 'primeng/api';
import { UsuarioService } from '../../services/usuarios.service';

declare var $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  userName: any;
  rol;
  actualpass;
  nuevapass;
  confirmarpass;
  nick;
  id;
  entidad;

  constructor(public authService: AuthService,
              public usuariosService: UsuarioService,
              private router: Router,
              private confirmationService: ConfirmationService,
              public messageServices: MessageService) {


              }

  ngOnInit(): void {
    $('#sidebarToggle').on('click', (e) => {
      e.preventDefault();
      $('body').toggleClass('sb-sidenav-toggled');
    });
  }

  confirm() {

    this.confirmationService.confirm({
      message: '¿Esta seguro de cerrar la sesión?',
      accept: () => {
          this.onLogout();
      }
    });
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
    location.reload();

  }


  updatePassword() {

  //  this.msgs.push({severity:'info', summary:'Info Message', detail:'PrimeNG rocks'});
    if (this.nuevapass != null || this.actualpass != null || this.confirmarpass != null) {
      this.usuariosService.verpass(this.authService.getCurrentUser().nick, this.actualpass).subscribe(datos => {

        if (datos[0].message === 'contraseña validad') {
          if (this.nuevapass === this.confirmarpass) {
              // tslint:disable-next-line:max-line-length
              this.usuariosService.updatePassword(this.authService.getCurrentUser()._id, this.confirmarpass, this.authService.getCurrentUser().nick).subscribe(data => {


                this.actualpass = null;
                this.nuevapass = null;
                this.confirmarpass = null;
                this.messageUpdate();
              });

          } else {
            this.messagePassNoConincide();
          }

        } else {
           this.messageErrorpassword();
        }
      });
    } else {
      this.messageServices.add({key: 'tr', severity: 'error', summary:
    'Success Message', detail: 'Por favor llenar los campos'});

    }

  }

  messagePassNoConincide() {
    this.messageServices.add({key: 'tr', severity: 'error', summary:
    'Success Message', detail: 'Las contraseñas no son iguales'});

  }


  messageUpdate() {
    this.messageServices.add({key: 'tr', severity: 'success', summary:
    'Success Message', detail: 'Contraseña actualizada con exito'});

  }

  messageErrorpassword() {
    this.messageServices.add({key: 'tr', severity: 'error', summary:
    'Error Message', detail: 'La contraseña actual es incorrecta'});
  }


}
