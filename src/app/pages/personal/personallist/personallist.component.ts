import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Table } from 'primeng/table/';
import { ExcelExportService } from 'src/app/services/excel-export.service';
import { Personal } from '../../../models/personal';
import { PersonalService } from '../../../services/personal.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personallist',
  templateUrl: './personallist.component.html',
  styleUrls: ['./personallist.component.css'],

})
export class PersonallistComponent implements OnInit {

  cols: any[];
  personales: any[];
  items: MenuItem[];
  newpersonal: boolean;
  displayDialog: boolean;
  personal: Personal;
  // tslint:disable-next-line:variable-name
  _id: any;
  selectedPersonal: Personal;
  casosFilter: any[];

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private router: Router, private messageService: MessageService, public personalService: PersonalService,
              public excelexport: ExcelExportService, public authService: AuthService) { }

  ngOnInit(): void {
    this.cols = [

      { field: 'nombres', header: 'Nombres' },
      { field: 'apellidos', header: 'Apellidos' },
      { field: 'rango', header: 'Rango' },
      { field: 'cargo', header: 'Cargo' },
      { field: 'unidadLabor', header: 'Unidad de labor' },
      { field: 'estacion', header: 'estacion' },
    ];

    this.personalService.find().subscribe(data => {
      this.data(JSON.stringify(data));

      console.log(data);
    });
  }


  showDialogToAdd() {
    this.newpersonal = true;
    // tslint:disable-next-line:new-parens
    this.personal = new Personal;
    this.displayDialog = true;
 }


  data(data) {
    this.personales = JSON.parse(data);
    console.log(this.personales);
   }

   save() {


    this.personal.completo = this.personal.nombres +  ' ' + this.personal.apellidos;


   // const cars = [...this.cars];
    if (this.newpersonal) {

      this.personal.idUser = this.authService.getCurrentUser()._id;
      console.log(this.personal);


      this.personalService.create(this.personal).subscribe( data => {
        console.log(data);
        this.messages(data);
      });
       // cars.push(this.car);
    } else {
      this.personalService.updatepersonal(this.selectedPersonal._id, this.personal).subscribe( data => {
        console.log(data);
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

      this.personalService.deletePersonal(this.selectedPersonal._id).subscribe( data => {
        console.log(data);
        this.messages(data);
      });
      this.personal = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newpersonal = false;
      this.personal = this.clenepersonal(event.data);
      this.displayDialog = true;
  }

  clenepersonal(c: Personal): Personal {
      // tslint:disable-next-line:new-parens
      const personal = new Personal;
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
    if (message === 'Personal creado con exito') {
      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.personalService.find().subscribe(data => {

        this.data(JSON.stringify(data));
        // console.log(JSON.stringify(data));
        //  this.usuarios = [JSON.stringify(data)];
        //  console.log(this.usuarios);
      });
    } else if (message === 'Personal eliminado')  {

      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.personalService.find().subscribe(data => {

        this.data(JSON.stringify(data));
      });

    } else if (message === 'Personal actualizado')  {

      this.messageService.add({key: 'tl', severity: 'success', summary:
      'Success Message', detail: message});

      this.personalService.find().subscribe(data => {

        this.data(JSON.stringify(data));
      });

    } else {
      this.messageService.add({key: 'tl', severity: 'error', summary:
      'Error Message', detail: 'Hubo un error'});

    }
  }

  exportAsXLSX(): void {
    this.excelexport.exportAsExcelFile(this.personales, 'personal');
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
    this.excelexport.exportAsExcelFile(this.casosFilter, 'personal');
  }


}
