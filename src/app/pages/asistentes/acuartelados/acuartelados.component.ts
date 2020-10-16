import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table/';
import { ExcelExportService } from 'src/app/services/excel-export.service';
import { Personal } from '../../../models/personal';
import { AuthService } from '../../../services/auth.service';
import { Acuartelados } from '../../../models/acuartelados';
import { Incidentes } from '../../../models/incidentes';
import { BomberosService } from '../../../services/bomberos.service';
import { AcuarteladosService } from '../../../services/acuartelados.service';
import {SelectItem} from 'primeng/api';
import { PersonalService } from '../../../services/personal.service';

@Component({
  selector: 'app-acuartelados',
  templateUrl: './acuartelados.component.html',
  styleUrls: ['./acuartelados.component.css']
})
export class AcuarteladosComponent implements OnInit {


  cols: any[];
  acuartelados: any[];
  items: MenuItem[];
  respuesta: SelectItem[];
  acuartelado: any[];
  id: string;
  incidente: Incidentes;


  newpersonal: boolean;
  displayDialog: boolean;
  personal: Acuartelados;

  // tslint:disable-next-line:variable-name
  _id: any;
  selectedPersonal: Personal;
  casosFilter: any[];
  selectAsistente: any;

  constructor(private router: Router, private messageService: MessageService, public personalService: PersonalService,
              public acuarteladosService: AcuarteladosService, public bomberosService: BomberosService,
              public excelexport: ExcelExportService, public authService: AuthService, private activateRouter: ActivatedRoute) {
                this.id = this.activateRouter.snapshot.paramMap.get('id');
              }

  ngOnInit(): void {
    this.cols = [

      { field: 'interno', header: 'Interno' },
      { field: 'reporte', header: 'Reporte #' },
      { field: 'nombres', header: 'Nombres' },
      { field: 'apellidos', header: 'Apellidos' },
      { field: 'asisteComo', header: 'Asiste como' },
    ];


    this.respuesta = [
      {label: 'Seleccione', value: null},
      {label: 'LABORAL', value: 'LABORAL'},
      {label: 'VOLUNTARIO', value: 'VOLUNTARIO'},
      {label: 'SANCIONADO', value: 'SANCIONADO'},
  ];


    this.personalService.find().subscribe(data => {
      if (data.message === 'Token no válido') {
        this.authService.logoutUser();
      }
      this.dataAsistente(data);
    });


    this.bomberosService.findCasoByID(this.id).subscribe( data => {
      if (data.message === 'Token no válido') {
        this.authService.logoutUser();
      }
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


    this.acuarteladosService.findByID(this.id).subscribe(
      data => {
        if (data.message === 'Token no válido') {
          this.authService.logoutUser();
        }

        this.datalist(JSON.stringify(data));

      }
    );


  }


  datalist(data) {
    this.acuartelados = JSON.parse(data);
  }


  dataAsistente(data) {
    this.acuartelado = data;
  }


  showDialogToAdd() {
    this.newpersonal = true;
    // tslint:disable-next-line:new-parens
    this.personal = new Acuartelados;
    this.displayDialog = true;
 }


  data(data) {
    this.acuartelados = JSON.parse(data);

   }

  cambiarAsistente() {
    this.personal.nombres = this.selectAsistente.nombres;
    this.personal.apellidos = this.selectAsistente.apellidos;
    this.personal.interno = this.selectAsistente.interno;
    this.personal.rango = this.selectAsistente.rango;
  }


   save() {


    this.personal.idReporte = this.id;
    this.personal.reporte = this.incidente.reporte;
    this.personal.fecha = this.incidente.fecha;
    this.personal.tipoIncidente = this.incidente.tipoIncidente;
   // const cars = [...this.cars];
    if (this.newpersonal) {

      this.personal.idUser = this.authService.getCurrentUser()._id;



      this.acuarteladosService.create(this.personal).subscribe( data => {
        if (data.message === 'Token no válido') {
          this.authService.logoutUser();
        }

        this.messages(data);
      });
       // cars.push(this.car);
    } else {
      this.acuarteladosService.updateAcuartelados(this.selectedPersonal._id, this.personal).subscribe( data => {
        if (data.message === 'Token no válido') {
          this.authService.logoutUser();
        }

        this.messages(data);
      });
     //   cars[this.cars.indexOf(this.selectedCar)] = this.car;
    }

  //  this.cars = cars;
    this.personal = null;
    this.displayDialog = false;
  }


  delete() {
      // const index = this.Personal.indexOf(this.selectedPersonal);
    //  this.Personal = this.Personal.filter((val, i) => i !== index);

      this.acuarteladosService.deleteAcuartelados(this.selectedPersonal._id).subscribe( data => {
        if (data.message === 'Token no válido') {
          this.authService.logoutUser();
        }

        this.messages(data);
      });
      this.personal = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newpersonal = false;
      this.personal = this.clonepersonal(event.data);
      this.displayDialog = true;
  }

  clonepersonal(c: Acuartelados): Acuartelados {
      // tslint:disable-next-line:new-parens
      const personal = new Acuartelados;
      // tslint:disable-next-line:forin
      for (const prop in c) {
          personal[prop] = c[prop];
      }
      return personal;
  }


  messages(data) {
    if (data.message) {
      const message = data.message;
      this.showSuccess(message);
    }

  }

  showSuccess(message: any) {
    if (message === 'Personal acuartelado guardado') {
      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.acuarteladosService.findByID(this.id).subscribe(
        data => {
          if (data.message === 'Token no válido') {
            this.authService.logoutUser();
          }

          this.datalist(JSON.stringify(data));

        }
      );
    } else if (message === 'Acuartelado eliminado')  {

      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.acuarteladosService.findByID(this.id).subscribe(
        data => {
          if (data.message === 'Token no válido') {
            this.authService.logoutUser();
          }

          this.datalist(JSON.stringify(data));

        }
      );

    } else if (message === 'Acuartelado actualizado')  {

      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.acuarteladosService.findByID(this.id).subscribe(
        data => {
          if (data.message === 'Token no válido') {
            this.authService.logoutUser();
          }

          this.datalist(JSON.stringify(data));

        }
      );

    }  else if (message === 'El usuario no es administrador')  {

      this.messageService.add({key: 'tl', severity: 'error', summary:
      'Success Message', detail: message});

    } else {
      this.messageService.add({key: 'tl', severity: 'error', summary:
      'Error Message', detail: 'Hubo un error'});

    }
  }

  exportAsXLSX(): void {
    this.excelexport.exportAsExcelFile(this.acuartelados, 'acuartelados');
  }

  exportAsXLSXFilter(e: Table): void {
    if (!e.filteredValue) {
      this.casosFilter = [];
      this.casosFilter.push({value: 'No empty'});
    } else {
      const header: any[] = [];
      e.filteredValue.forEach((c) => { header.push(e.filteredValue[c]); });

      this.casosFilter = e.filteredValue;
    }
    this.excelexport.exportAsExcelFile(this.casosFilter, 'acuartelados');
  }

}
