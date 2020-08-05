import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AmbulanciasService } from '../../../services/ambulancias.service';
import { Ambulancias } from '../../../models/ambulancias';
import { Table } from 'primeng/table/';
import { ExcelExportService } from 'src/app/services/excel-export.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  cols: any[];
  ambulancias: any[];
  items: MenuItem[];
  newAmbulancia: boolean;
  displayDialog: boolean;
  ambulancia: Ambulancias;
  // tslint:disable-next-line:variable-name
  _id: any;
  selectedAmbulancias: Ambulancias;
  casosFilter: any[];

  constructor(private router: Router, private messageService: MessageService, public ambulanciasService: AmbulanciasService,
              public excelexport: ExcelExportService) { }

  ngOnInit(): void {

    this.cols = [

      { field: 'maquina', header: 'Maquina' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'placa', header: 'Placa' },
    ];

    this.ambulanciasService.find().subscribe(data => {
      this.data(JSON.stringify(data));

      console.log(data);
    });
  }


  showDialogToAdd() {
    this.newAmbulancia = true;
    // tslint:disable-next-line:new-parens
    this.ambulancia = new Ambulancias;
    this.displayDialog = true;
 }


  data(data) {
    this.ambulancias = JSON.parse(data);
    console.log(this.ambulancias);
   }

   save() {
   // const cars = [...this.cars];
    if (this.newAmbulancia) {

      this.ambulanciasService.create(this.ambulancia).subscribe( data => {
        console.log(data);
        this.messages(data);
      });
       // cars.push(this.car);
    } else {
      this.ambulanciasService.updateAmbulancias(this.selectedAmbulancias._id, this.ambulancia).subscribe( data => {
        console.log(data);
        this.messages(data);
      });
     //   cars[this.cars.indexOf(this.selectedCar)] = this.car;
    }

  //  this.cars = cars;
    this.ambulancia = null;
    this.displayDialog = false;
  }


  delete() {
      // const index = this.ambulancias.indexOf(this.selectedAmbulancias);
    //  this.ambulancias = this.ambulancias.filter((val, i) => i !== index);

      this.ambulanciasService.deleteAmbulancias(this.selectedAmbulancias._id).subscribe( data => {
        console.log(data);
        this.messages(data);
      });
      this.ambulancia = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newAmbulancia = false;
      this.ambulancia = this.cleneAmbulancia(event.data);
      this.displayDialog = true;
  }

  cleneAmbulancia(c: Ambulancias): Ambulancias {
      // tslint:disable-next-line:new-parens
      const ambulancia = new Ambulancias;
      // tslint:disable-next-line:forin
      for (const prop in c) {
          ambulancia[prop] = c[prop];
      }
      return ambulancia;
  }


  messages(data) {
    if (data.message) {
      const message = data.message;
      this.showSuccess(message);
    }

  }

  showSuccess(message: any) {
    if (message === 'Ambulancia creado con exito') {
      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.ambulanciasService.find().subscribe(data => {

        this.data(JSON.stringify(data));
        // console.log(JSON.stringify(data));
        //  this.usuarios = [JSON.stringify(data)];
        //  console.log(this.usuarios);
      });
    } else if (message === 'Ambulancia eliminada')  {

      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.ambulanciasService.find().subscribe(data => {

        this.data(JSON.stringify(data));
      });

    } else if (message === 'Ambulancia actualizada')  {

      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.ambulanciasService.find().subscribe(data => {

        this.data(JSON.stringify(data));
      });

    } else {
      this.messageService.add({key: 'tl', severity: 'error', summary:
      'Error Message', detail: 'Hubo un error'});

    }
  }

  exportAsXLSX(): void {
    this.excelexport.exportAsExcelFile(this.ambulancias, 'ambulancias');
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
    this.excelexport.exportAsExcelFile(this.casosFilter, 'ambulancias');
  }

}
