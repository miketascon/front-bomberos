import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Table } from 'primeng/table/';
import { ExcelExportService } from 'src/app/services/excel-export.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuarios.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {

  public myForm: FormGroup;
  public usuarios: any[];
  public usuario: User;
  public selectUsuario: User;
  public newUsuario: boolean;
  public displayDialog: boolean;
  public cols: any[];
  public casosFilter: any[];
  public password: string;
  public activo = true;
  public roles: any[];

  constructor(private router: Router,
              private messageService: MessageService,
              public excelexport: ExcelExportService,
              private fb: FormBuilder,
              public usuariosService: UsuarioService,
              public authService: AuthService) {
                this.cols = [
                  { field: 'nombre', header: 'Nombre' },
                  { field: 'email', header: 'Correo electrónico' },
                  { field: 'activo', header: 'Activo' },
                  { field: 'role', header: 'Rol' },
                ];

                this.password = 'Siellano' + new Date().getFullYear().toString();

                this.roles = [
                  {label: 'SELECCIONAR', value: null},
                  {label: 'USUARIO', value: 'USER_ROLE'},
                  {label: 'ADMINISTRADOR', value: 'ADMIN_ROLE'},

                ];

              }

  ngOnInit(): void {

    this.usuariosService.find().subscribe(data => {
        if (data.message === 'Token no válido') {
          this.authService.logoutUser();
        }
        this.data(JSON.stringify(data));
      });
  }

  showDialogToAdd() {
    this.newUsuario = true;
    // tslint:disable-next-line:new-parens
    this.usuario = new User;
    this.usuario.nombre = '';
    this.usuario.email = '';
    this.usuario.password = '';
    this.usuario.activo = true;
    this.usuario.role = 'USER_ROLE';
    this.displayDialog = true;
 }


  data(data) {
    this.usuarios = JSON.parse(data);
   }


   onRowSelect(event) {
    this.newUsuario = false;
    this.usuario = this.clonarUsuario(event.data);
    this.displayDialog = true;
  }

  clonarUsuario(c: User): User {
      // tslint:disable-next-line:new-parens
      const user = new User;
      // tslint:disable-next-line:forin
      for (const prop in c) {
          user[prop] = c[prop];
      }
      return user;
  }

  save() {

    if (this.usuario.nombre === null || this.usuario.nombre === '' || this.usuario.nombre === undefined ||
        this.usuario.email === null || this.usuario.email === '' || this.usuario.email === undefined ||
        this.usuario.activo === null || this.usuario.activo === undefined ||
        this.usuario.role === null || this.usuario.role === '' || this.usuario.role === undefined ||
        this.password === null || this.password === '' || this.password === undefined ) {
      this.messageService.add({
        key: 'tl', severity: 'error', summary:
          'Error Message', detail: 'Por favor llenar todos los campo'
      });


    } else {
      this.usuario.password = this.password;

      if (this.newUsuario) {

        this.usuariosService.create(this.usuario).subscribe( data => {
          if (data.message === 'Token no válido') {
            this.authService.logoutUser();
          }

          this.messages(data);
        });
         // cars.push(this.car);
      } else {
        this.usuariosService.update(this.selectUsuario._id, this.usuario).subscribe( data => {
          console.log(data);
          if (data.message === 'Token no válido') {
            this.authService.logoutUser();
          }

          this.messages(data);
        });
       //   cars[this.cars.indexOf(this.selectedCar)] = this.car;
      }
    //  this.cars = cars;

    }

  }


  delete() {
  // const index = this.ambulancias.indexOf(this.selectedAmbulancias);
  //  this.ambulancias = this.ambulancias.filter((val, i) => i !== index);

    this.usuariosService.deleteUser(this.selectUsuario._id).subscribe( data => {
      if (data.message === 'Token no válido') {
        this.authService.logoutUser();
      }

      this.messages(data);
    });
    this.usuario = null;
    this.displayDialog = false;

}


messages(data) {
  if (data.message) {
    const message = data.message;
    this.showSuccess(message);
  }

}

showSuccess(message: any) {
  if (message === 'Usuario creado con exito') {
    this.messageService.add({key: 'tl', severity: 'success', summary:
    'Success Message', detail: message});

    this.usuariosService.find().subscribe(data => {
      if (data.message === 'Token no válido') {
        this.authService.logoutUser();
      }

      this.data(JSON.stringify(data));

    });
    this.displayDialog = false;
    this.usuario = null;
  } else if (message === 'Usuario eliminado')  {

    this.messageService.add({key: 'tl', severity: 'success', summary:
    'Success Message', detail: message});

    this.usuariosService.find().subscribe(data => {
      if (data.message === 'Token no válido') {
        this.authService.logoutUser();
      }

      this.data(JSON.stringify(data));
    });
    this.displayDialog = false;
    this.usuario = null;

  } else if (message === 'Usuario actualizado')  {

    this.messageService.add({key: 'tl', severity: 'success', summary:
    'Success Message', detail: message});

    this.usuariosService.find().subscribe(data => {
      if (data.message === 'Token no válido') {
        this.authService.logoutUser();
      }

      this.data(JSON.stringify(data));
    });
    this.displayDialog = false;
    this.usuario = null;

  } else if (message === 'Usuario Existente')  {

    this.messageService.add({key: 'tl', severity: 'error', summary:
    message, detail: 'El correo electrónico ya se encuentra registrado' });

  } else {
    this.messageService.add({key: 'tl', severity: 'error', summary:
    'Error Message', detail: 'Hubo un error'});

  }
}


exportAsXLSX(): void {
  this.excelexport.exportAsExcelFile(this.usuarios, 'usuarios');
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
  this.excelexport.exportAsExcelFile(this.casosFilter, 'usuarios');
}


}
