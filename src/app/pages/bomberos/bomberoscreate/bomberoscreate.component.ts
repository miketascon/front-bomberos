import { Component, OnInit } from '@angular/core';
import { Incidentes } from '../../../models/incidentes';
import { AuthService } from '../../../services/auth.service';
import { BomberosService } from '../../../services/bomberos.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-bomberoscreate',
  templateUrl: './bomberoscreate.component.html',
  styleUrls: ['./bomberoscreate.component.css'],
  providers: [MessageService]
})
export class BomberoscreateComponent implements OnInit {


  incidente: Incidentes;
  fecha: any;
  hora: any;
  incidentesTipos: any[] = [];
  zona: any[] = [];

  constructor(public authService: AuthService,
              public incidenteService: BomberosService,
              private messageService: MessageService,
              private router: Router ) {

  }

  ngOnInit(): void {
    // tslint:disable-next-line:new-parens
    this.incidente = new Incidentes;
    this.incidente.idUser = this.authService.getCurrentUser()._id;
    this.incidente.guardiaTurno = this.authService.getCurrentUser().role;
    this.incidente.nombresGuardia = this.authService.getCurrentUser().nom;
    this.incidente.apellidosGuardia = this.authService.getCurrentUser().ape;
    this.fecha = new Date();
    this.hora = new Date();

    this.incidentesTipos = [
      { label: 'Seleccionar', value: null},
      { label: 'Accidente de transito', value: 'Accidente de transito'},
      { label: 'Persona lesionada', value: 'Persona lesionada'},
      { label: 'Persona delicada de salud', value: 'Persona delicada de salud'},
    ];

    this.zona = [
      { label: 'Seleccionar', value: null},
      { label: 'Urbana', value: 'Urbana'},
      { label: 'Rural', value: 'Rural'},
    ];
  }


  guardar() {


    const fechaReporte = moment(this.fecha).format('DD/MM/YYYY');
    /*   const mesReporte = fechaReporte.getMonth() + 1;
      const nuevafechaReporte = fechaReporte.getFullYear() + '/' + mesReporte + '/' + fechaReporte.getDate(); */
    this.incidente.fecha = fechaReporte;


    const horaReporte = moment(this.hora).format('HH:mm:ss');
   /*  const minutos = horaReporte.getMinutes();
    const horas = horaReporte.getHours();
    const nuevahoraReporte =  horas + ':' + minutos; */
    this.incidente.hora = horaReporte;




    if (this.incidente) {
      this.incidenteService.create(this.incidente).subscribe( data => {
        if (data.message === 'Token no válido') {
          this.authService.logoutUser();
        }
        this.messages(data);
       // this.router.navigate(['informe']);

      }, error => {
          console.error('Error storing item', error);
        });
      }

  }


  messages(data) {
    if (data.message) {
      const message = data.message;
      this.showSuccess(message);
    }

  }
    showSuccess(message: any) {
      if (message === 'Caso creado con exito') {
        this.messageService.add({key: 'tl', severity: 'success', summary:
        'Success Message', detail: message});
        this.redirect();

      } else {
        this.messageService.add({key: 'tl', severity: 'error', summary:
        'Error Message', detail: 'El caso no se pudo eliminar'});
      }
    }


     // tslint:disable-next-line:typedef
  redirect() {
    setTimeout(() => {
      this.router.navigate(['pages/incidentes/lista/']);
    }, 2000);
  }

}
