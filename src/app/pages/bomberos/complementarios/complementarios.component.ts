import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BomberosService } from '../../../services/bomberos.service';
import { Incidentes } from '../../../models/incidentes';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-complementarios',
  templateUrl: './complementarios.component.html',
  styleUrls: ['./complementarios.component.css'],
  providers: [MessageService]
})
export class ComplementariosComponent implements OnInit {

  id: string;
  incidente: Incidentes;

  constructor(public authService: AuthService, private router: Router, private activateRouter: ActivatedRoute,
    // tslint:disable-next-line:max-line-length
              public bomberosService: BomberosService, private messageService: MessageService) {
                this.id = this.activateRouter.snapshot.paramMap.get('id');
              }

  ngOnInit(): void {


    this.bomberosService.findCasoByID(this.id).subscribe( data => {
      // tslint:disable-next-line:new-parens
      this.incidente = new Incidentes;
      this.incidente.fecha = data[0].fecha;
      this.incidente.hora = data[0].hora;
      this.incidente.tipoIncidente = data[0].tipoIncidente;
      this.incidente.reporte = data[0].reporte;
      this.incidente.maquina = data[0].maquina;
      this.incidente.tipo = data[0].tipo;

      this.incidente.salida = data[0].salida;
      this.incidente.enSitio = data[0].enSitio;
      this.incidente.terminoLabor = data[0].terminoLabor;
      this.incidente.regreso = data[0].regreso;

      this.incidente.respuesta = data[0].respuesta;
      this.incidente.maniobra = data[0].maniobra;
      this.incidente.retorno = data[0].retorno;
      this.incidente.totalMinutos = data[0].totalMinutos;


      this.incidente.descripcion = data[0].descripcion;
      this.incidente.procedimiento = data[0].procedimiento;
      this.incidente.observaciones = data[0].observaciones;
      this.incidente.otrasEntidades = data[0].otrasEntidades;

    });
  }



  guardar() {

   this.bomberosService.updateBomberos(this.id, this.incidente).subscribe(data => {
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
