import { Component, OnInit } from '@angular/core';
import { Incidentes } from '../../../models/incidentes';
import { AuthService } from '../../../services/auth.service';
import { BomberosService } from '../../../services/bomberos.service';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-bomberosupdate',
  templateUrl: './bomberosupdate.component.html',
  styleUrls: ['./bomberosupdate.component.css'],
  providers: [MessageService]
})
export class BomberosupdateComponent implements OnInit {

  id: string;
  incidente: Incidentes;

  constructor(public authService: AuthService,
              public bomberosService: BomberosService,
              private messageService: MessageService,
              private router: Router,
              private activateRouter: ActivatedRoute) {
                this.id = this.activateRouter.snapshot.paramMap.get('id');
              }

  ngOnInit(): void {

    this.bomberosService.findCasoByID(this.id).subscribe( data => {
      // tslint:disable-next-line:new-parens
      this.incidente = new Incidentes;
      this.incidente.fecha = data[0].fecha;
      this.incidente.hora = data[0].hora;
      this.incidente.tipoIncidente = data[0].tipoIncidente;
      this.incidente.tipoLlamada = data[0].tipoLlamada;
      this.incidente.reporte = data[0].reporte;
      this.incidente.maquina = data[0].maquina;
      this.incidente.tipo = data[0].tipo;

      this.incidente.direccion = data[0].direccion;
      this.incidente.barrioComuna = data[0].barrioComuna;
      this.incidente.zona = data[0].zona;

      this.incidente.institucionInforma = data[0].institucionInforma;
      this.incidente.nombres = data[0].nombres;
      this.incidente.apellidos = data[0].apellidos;
      this.incidente.cedula = data[0].cedula;
      this.incidente.ciudadExpedicion = data[0].ciudadExpedicion;
      this.incidente.celTel = data[0].celTel;
      this.incidente.otroMetodo = data[0].otroMetodo;

      this.incidente.guardiaTurno = data[0].guardiaTurno;
      this.incidente.nombresGuardia = data[0].nombresGuardia;
      this.incidente.apellidosGuardia = data[0].apellidosGuardia;


      this.incidente.salida = data[0].salida;
      this.incidente.enSitio = data[0].enSitio;
      this.incidente.terminoLabor = data[0].terminoLabor;
      this.incidente.regreso = data[0].regreso;

      this.incidente.respuesta = data[0].respuesta;
      this.incidente.maniobra = data[0].maniobra;
      this.incidente.retorno = data[0].retorno;
      this.incidente.totalMinutos = data[0].totalMinutos;


    });
  }

  guardar() {

    this.bomberosService.updateBomberos(this.id, this.incidente).subscribe( data => {
      if (data.message === 'Token no válido') {
        this.authService.logoutUser();
      }
      this.messages(data);
    });

  }


  messages(data) {
    if (data.message) {
      const message = data.message;
      this.showSuccess(message);
    }

  }
    showSuccess(message: any) {
      if (message === 'Caso Actualizado') {
        this.messageService.add({key: 'tl', severity: 'success', summary:
        'Success Message', detail: message});
        this.redirect();

      } else {
        this.messageService.add({key: 'tl', severity: 'error', summary:
        'Error Message', detail: 'El caso no se actualizar'});
      }
    }


     // tslint:disable-next-line:typedef
  redirect() {
    setTimeout(() => {
      this.router.navigate(['pages/incidentes/lista/']);
    }, 2000);
  }

}
