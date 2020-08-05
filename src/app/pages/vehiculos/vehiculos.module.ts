import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListavehiculosComponent } from './listavehiculos/listavehiculos.component';
import { VehiculosComponent } from './vehiculos.component';
import { VehiculosRoutingModule } from './vehiculos.routing';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LesionadosComponent } from './lesionados/lesionados.component';



@NgModule({
  declarations: [ListavehiculosComponent, VehiculosComponent, LesionadosComponent],
  imports: [
    CommonModule,
    VehiculosRoutingModule,
    ToastModule,
    TableModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    ContextMenuModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    PanelModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule
  ]
})
export class VehiculosModule { }
