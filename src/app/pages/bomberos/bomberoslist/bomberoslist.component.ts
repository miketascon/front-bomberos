import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Bomberos } from 'src/app/models/bomberos';
import { BomberosService } from '../../../services/bomberos.service';
import { Table } from 'primeng/table/';
import { ExcelExportService } from 'src/app/services/excel-export.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-bomberoslist',
  templateUrl: './bomberoslist.component.html',
  styleUrls: ['./bomberoslist.component.css'],
  providers: [MessageService]
})
export class BomberoslistComponent implements OnInit {

  public status: string;
  displayDialog: boolean;
  selectedbombs: Bomberos;



  cols: any[];
  primerNombre: any[];
  public responsable: string;
  newCar;
  bomberos: Bomberos;
  casos: any[];
  items: MenuItem[];
  // tslint:disable-next-line:variable-name
  _id: any;
  casosFilter: any[];


  constructor(public bomberosService: BomberosService, private router: Router, private messageService: MessageService,
              public excelexport: ExcelExportService, public authService: AuthService) { }

  ngOnInit(): void {

    this.items = [
      { label: 'Info basica', icon: 'pi pi-pencil', command: (event) => this.update(this.selectedbombs) },
      { label: 'Tiempos y emerg.', icon: 'pi pi-clock', command: (event) => this.tiempos(this.selectedbombs) },
      { label: 'Complementarios', icon: 'pi pi-paperclip', command: (event) => this.complementarios(this.selectedbombs) },
      { label: 'Asistentes', icon: 'pi pi-users', command: (event) => this.asistentes(this.selectedbombs) },
      { label: 'Acuartelados', icon: 'pi pi-home', command: (event) => this.acuartelados(this.selectedbombs) },
      { label: 'Vehiculos', icon: 'pi pi-exclamation-triangle', command: (event) => this.vehiculos(this.selectedbombs) },
      { label: 'Lesionados', icon: 'pi pi-user-minus', command: (event) => this.lesionados(this.selectedbombs) },

    ];


    if (this.authService.getCurrentUser().delete === true) {
      this.items.push({ label: 'Eliminar', icon: 'pi pi-minus', command: (event) => this.delete(this.selectedbombs) });
    }

    this.cols = [

      { field: 'reporte', header: 'Número de reporte' },
      { field: 'fecha', header: 'Fecha de Incidente ' },
      { field: 'hora', header: 'Hora de Incidente / 24h' },
      { field: 'tipoIncidente', header: 'Tipo de Incidente' },
      { field: 'tipoLlamada', header: 'Tipo llamada' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'barrioComuna', header: 'Barrio' },
      { field: 'zona', header: 'Zona' },
  ];
    this.bomberosService.find().subscribe(data => {
      if (data.message === 'Token no válido') {
        this.authService.logoutUser();
      }
      this.data(JSON.stringify(data));

   });
  }


  create() {
    this.router.navigate(['ambulancia']);
  }

  data(data) {
    this.casos = JSON.parse(data);

   }
  onRowSelect(event) {

  }

  /********menu table******* */

  update(bombero: Bomberos) {
    this.router.navigate(['/pages/incidentes/basica/' + bombero._id]);
  }

  delete(bombero: Bomberos) {
    this.bomberosService.deleteBomberos(bombero._id).subscribe(data => {

      if (data.err.message === 'Token no válido') {
        this.authService.logoutUser();
      }


      this.messages(data);
    });
  }


  tiempos(bombero: Bomberos) {
    this.router.navigate(['/pages/incidentes/tiempos/' + bombero._id]);
  }

  complementarios(bombero: Bomberos) {
    this.router.navigate(['/pages/incidentes/complementarios/' + bombero._id]);
  }

  asistentes(bombero: Bomberos) {
    this.router.navigate(['/pages/asistentes/lista/' + bombero._id]);
  }

  acuartelados(bombero: Bomberos) {
    this.router.navigate(['/pages/asistentes/acuartelados/' + bombero._id]);
  }

  vehiculos(bombero: Bomberos) {
    this.router.navigate(['pages/vehiculos/lista/' + bombero._id]);
  }

  lesionados(bombero: Bomberos) {
    this.router.navigate(['pages/vehiculos/lesionados/' + bombero._id]);
  }

  /************************************************** */


  messages(data) {
    if (data.message) {
      const message = data.message;
      this.showSuccess(message);
    }

  }

  showSuccess(message: any) {
    if (message === 'Caso borrado') {
      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.bomberosService.find().subscribe(data => {
        if (data.message === 'Token no válido') {
          this.authService.logoutUser();
        }


        this.data(JSON.stringify(data));

      });
    } else if (message === 'El usuario no es administrador')  {

      this.messageService.add({key: 'tl', severity: 'error', summary:
      'Success Message', detail: message});

    } else {
      this.messageService.add({key: 'tl', severity: 'error', summary:
      'Error Message', detail: 'El caso no se pudo eliminar'});
    }
  }


  exportAsXLSX(): void {
    this.excelexport.exportAsExcelFile(this.casos, 'casos');
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
    this.excelexport.exportAsExcelFile(this.casosFilter, 'casos');
  }

}
