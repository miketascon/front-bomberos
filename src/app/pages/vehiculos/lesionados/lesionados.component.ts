import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table/';
import { ExcelExportService } from 'src/app/services/excel-export.service';
import { AuthService } from '../../../services/auth.service';
import { Incidentes } from '../../../models/incidentes';
import { BomberosService } from '../../../services/bomberos.service';
import {SelectItem} from 'primeng/api';
import * as moment from 'moment';
import { LesionadosService } from '../../../services/lesionados.service';
import { Lesionados } from '../../../models/lesionados';


@Component({
  selector: 'app-lesionados',
  templateUrl: './lesionados.component.html',
  styleUrls: ['./lesionados.component.css']
})
export class LesionadosComponent implements OnInit {

  cols: any[];
  lesionados: any[];
  items: MenuItem[];
  respuesta: SelectItem[];

  id: string;
  incidente: Incidentes;
  halladoResp: any[];
  tipoDoc: any[];
  lesionado: Lesionados;


  newvehiculo: boolean;
  displayDialog: boolean;

  // tslint:disable-next-line:variable-name
  _id: any;
  casosFilter: any[];
  selectedlesionados: Lesionados;

  constructor(private router: Router, private messageService: MessageService,
              public bomberosService: BomberosService,
              public excelexport: ExcelExportService,
              public authService: AuthService, public lesionadosService: LesionadosService,
              private activateRouter: ActivatedRoute) {
                this.id = this.activateRouter.snapshot.paramMap.get('id');
              }

  ngOnInit(): void {
    this.cols = [
      { field: 'nombres', header: 'Nombres del lesionado' },
      { field: 'apellidos', header: 'Apellidos del lesionado' },
      { field: 'tipoDocumento', header: 'Tipo documento' },
      { field: 'numeroDocumento', header: 'Número documento' },
      { field: 'ciudadExpedicion', header: 'Ciudad expedición' },
      { field: 'hallado', header: 'Hallado' },
      { field: 'edad', header: 'Edad' },
      { field: 'traslado', header: 'Traslado' },
      { field: 'marca', header: 'Marca' },
      { field: 'placa', header: 'Placa #' },
      { field: 'tipoVehiculo', header: 'Tipo de vehiculo' },



    ];

    this.respuesta = [
      {label: 'SELECCIONAR', value: null},
      {label: 'AUTOMOVIL', value: 'AUTOMOVIL'},
      {label: 'BICICLETA', value: 'BICICLETA'},
      {label: 'BUS', value: 'BUS'},
      {label: 'BUSETA', value: 'BUSETA'},
      {label: 'CAMION', value: 'CAMION'},
      {label: 'CAMIONETA', value: 'CAMIONETA'},
      {label: 'CAMPERO', value: 'CAMPERO'},
      {label: 'MOTOCARRO', value: 'MOTOCARRO'},
      {label: 'MOTOCICLETA', value: 'MOTOCICLETA'},
      {label: 'REMOLQUE', value: 'REMOLQUE'},
      {label: 'TAXI', value: 'TAXI'},
  ];


    this.halladoResp = [
      {label: 'SELECCIONAR', value: null},
      {label: 'VIVO', value: 'VIVO'},
      {label: 'MUERTO', value: 'MUERTO'}
    ];

    this.tipoDoc = [
      {label: 'SELECCIONAR', value: null},
      {label: 'CÉDULA DE CIUDADANÍA', value: 'CÉDULA DE CIUDADANÍA'},
      {label: 'CÉDULA DE EXTRANGERÍA', value: 'CÉDULA DE EXTRANGERÍA'},
      {label: 'TARJETA DE IENTIDAD', value: 'TARJETA DE IENTIDAD'},
      {label: 'REGISTRO CIVIL', value: 'REGISTRO CIVIL'},
      {label: 'PASAPORTE', value: 'PASAPORTE'},
      {label: 'MENOR SIN IDENTIFICACION', value: 'MENOR SIN IDENTIFICACION'},
      {label: 'ADULTO SIN IDENTIFICACION', value: 'ADULTO SIN IDENTIFICACION'},
      {label: 'CERTIFICADO NACIDO VIVO', value: 'CERTIFICADO NACIDO VIVO'},
      {label: 'CARNET DIPLOMATICO', value: 'CARNET DIPLOMATICO'},
      {label: 'PERMISO ESPECIAL', value: 'PERMISO ESPECIAL'},
      {label: 'PERSONA SIN IDENTIFICACION', value: 'PERSONA SIN IDENTIFICACION'}
    ];



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


    this.lesionadosService.findByID(this.id).subscribe(
      data => {

        this.datalist(JSON.stringify(data));
        console.log(data);

      }
    );

  }

  datalist(data) {
    this.lesionados = JSON.parse(data);
  }


  showDialogToAdd() {
    this.newvehiculo = true;
    // tslint:disable-next-line:new-parens
    this.lesionado = new Lesionados;
    this.displayDialog = true;
 }


   save() {

    this.lesionado.idReporte = this.id;


   // const cars = [...this.cars];
    if (this.newvehiculo) {

      this.lesionado.idUser = this.authService.getCurrentUser()._id;
      console.log(this.lesionado);


      this.lesionadosService.create(this.lesionado).subscribe( data => {
        console.log(data);
        this.messages(data);
      });
       // cars.push(this.car);
    } else {
      this.lesionadosService.updateLesionados(this.selectedlesionados._id, this.lesionado).subscribe( data => {
        console.log(data);
        this.messages(data);
      });
     //   cars[this.cars.indexOf(this.selectedCar)] = this.car;
    }

  //  this.cars = cars;
    this.lesionados = null;
    this.displayDialog = false;

  }


  delete() {
      // const index = this.vehiculo.indexOf(this.selectedvehiculo);
    //  this.vehiculo = this.vehiculo.filter((val, i) => i !== index);

      this.lesionadosService.deleteLesionados(this.selectedlesionados._id).subscribe( data => {
        console.log(data);
        this.messages(data);
      });
      this.lesionado = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newvehiculo = false;
      this.lesionado = this.clone(event.data);
      this.displayDialog = true;
  }

  clone(c: Lesionados): Lesionados {
      // tslint:disable-next-line:new-parens
      const lesionado = new Lesionados;
      // tslint:disable-next-line:forin
      for (const prop in c) {
          lesionado[prop] = c[prop];
      }
      return lesionado;
  }


  messages(data) {
    if (data.message) {
      const message = data.message;
      this.showSuccess(message);
    }

  }

  showSuccess(message: any) {
    if (message === 'Lesionado guardado') {
      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.lesionadosService.findByID(this.id).subscribe(
        data => {

          this.datalist(JSON.stringify(data));

        }
      );
    } else if (message === 'Lesionado eliminado')  {

      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.lesionadosService.findByID(this.id).subscribe(data => {

        this.datalist(JSON.stringify(data));
      });

    } else if (message === 'Lesionado actualizado')  {

      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.lesionadosService.findByID(this.id).subscribe(data => {

        this.datalist(JSON.stringify(data));
      });

    } else {
      this.messageService.add({key: 'tl', severity: 'error', summary:
      'Error Message', detail: 'Hubo un error'});

    }
  }

  exportAsXLSX(): void {
    this.excelexport.exportAsExcelFile(this.lesionados, 'lesionados');
  }

  exportAsXLSXFilter(e: Table): void {
    if (!e.filteredValue) {
      this.casosFilter = [];
      this.casosFilter.push({value: 'No empty'});
    } else {
      const header: any[] = [];
      e.filteredValue.forEach((c) => { header.push(e.filteredValue[c]); });
     // console.log(header);
      this.casosFilter = e.filteredValue;
    }
    this.excelexport.exportAsExcelFile(this.casosFilter, 'lesionados');
  }


}
