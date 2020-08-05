import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BomberosService } from '../../../services/bomberos.service';
import { Incidentes } from '../../../models/incidentes';
import { AmbulanciasService } from '../../../services/ambulancias.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tiempos',
  templateUrl: './tiempos.component.html',
  styleUrls: ['./tiempos.component.css'],
  providers: [MessageService]
})
export class TiemposComponent implements OnInit {

  id: string;
  incidente: Incidentes;
  filteredAmbulanciaSingle: any[];
  maquinaAsiganada: {
    maquina: string,
    tipo: string,
    placa: string
  };

  salida: any;
  enSitio: any;
  terminoLabor: any;
  regreso: any;
  respuesta: any;
  retorno: any;
  maniobra: any;
  totalMinutos: any;
  tiemposDespl: boolean;

  constructor(public authService: AuthService, private router: Router, private activateRouter: ActivatedRoute,
              // tslint:disable-next-line:max-line-length
              public bomberosService: BomberosService, private messageService: MessageService, public ambulanciaService: AmbulanciasService) {
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


      this.maquinaAsiganada.maquina = data[0].maquina;
      this.maquinaAsiganada.tipo = data[0].tipo;

    });
  }

    // tslint:disable-next-line:typedef
    filterSingle(event) {
      const query = event.query;
      this.ambulanciaService.find().subscribe(datos => {
          this.filteredAmbulanciaSingle = this.filter(query, datos);
      });
  }

  filter(query, ambulancias: any): any[] {
    const filtered: any[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ambulancias.length; i++) {
        const ambulancia = ambulancias[i];
        if (ambulancia.maquina.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push({
              maquina: ambulancia.maquina,
              tipo:  ambulancia.tipo,
              placa: ambulancia.placa
            });
        }
    }
    return filtered;
  }


  setRespuesta() {
    this.incidente.respuesta = moment.utc(moment(this.enSitio, 'DD/MM/YYYY HH:mm:ss').diff
    (moment(this.salida, 'DD/MM/YYYY HH:mm:ss'))).format('HH:mm:ss');
    this.terminoLabor = this.enSitio;


  }

  setManiobra() {
    this.incidente.maniobra = moment.utc(moment(this.terminoLabor, 'DD/MM/YYYY HH:mm:ss').diff
    (moment(this.enSitio, 'DD/MM/YYYY HH:mm:ss'))).format('HH:mm:ss');
    this.regreso = this.terminoLabor;

  }

  setRetorno() {
    this.incidente.retorno = moment.utc(moment(this.regreso, 'DD/MM/YYYY HH:mm:ss').diff
    (moment(this.terminoLabor, 'DD/MM/YYYY HH:mm:ss'))).format('HH:mm:ss');

    this.incidente.totalMinutos = moment.utc(moment(this.regreso, 'DD/MM/YYYY HH:mm:ss').diff
    (moment(this.salida, 'DD/MM/YYYY HH:mm:ss'))).format('HH:mm:ss');
    this.regreso = this.terminoLabor;
  }



  guardar() {


    if (this.incidente.maquina === undefined) {
      this.incidente.maquina =      this.maquinaAsiganada.maquina;
      this.incidente.tipo =         this.maquinaAsiganada.tipo;
    }

    if (this.salida) {
      this.incidente.salida =       moment(this.salida).format('HH:mm:ss');

    }


    if (this.enSitio) {
      this.incidente.enSitio =      moment(this.enSitio).format('HH:mm:ss');

    }

    if (this.terminoLabor) {
      this.incidente.terminoLabor = moment(this.terminoLabor).format('HH:mm:ss');

    }

    if (this.regreso) {
      this.incidente.regreso =      moment(this.regreso).format('HH:mm:ss');

    }


    this.bomberosService.updateBomberos(this.id, this.incidente).subscribe(data => {
      this.messages(data);
      console.log(data);
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
