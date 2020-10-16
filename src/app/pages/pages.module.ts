import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';
import { LayaoutModule } from '../layaout/layaout.module';
import { HomeComponent } from './home/home.component';
import { BomberosModule } from './bomberos/bomberos.module';
import { AmbulanciasModule } from './ambulancias/ambulancias.module';
import { UsersComponent } from './users/users.component';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';



@NgModule({
  declarations: [PagesComponent, HomeComponent, UsersComponent, ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    BomberosModule,
    AmbulanciasModule,
    LayaoutModule,
    ToastModule,
    TableModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    ContextMenuModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CheckboxModule



  ],

})
export class PagesModule { }
