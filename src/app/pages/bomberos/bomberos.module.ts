import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BomberosComponent } from './bomberos.component';
import { BomberosRoutingModule } from './bomberos.routing';


import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';

import { TableModule } from 'primeng/table';
import { ContextMenuModule} from 'primeng/contextmenu';
import { FormsModule } from '@angular/forms';
import { BomberoscreateComponent } from './bomberoscreate/bomberoscreate.component';
import { BomberoslistComponent } from './bomberoslist/bomberoslist.component';
import { BomberosupdateComponent } from './bomberosupdate/bomberosupdate.component';
import { CalendarModule } from 'primeng/calendar';
import { TiemposComponent } from './tiempos/tiempos.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ComplementariosComponent } from './complementarios/complementarios.component';
import { InputTextareaModule } from 'primeng/inputtextarea';

import {DropdownModule} from 'primeng/dropdown';





@NgModule({
  declarations: [BomberoscreateComponent, BomberoslistComponent, BomberosupdateComponent, BomberosComponent, TiemposComponent,
    ComplementariosComponent],
  imports: [
    CommonModule,
    BomberosRoutingModule,
    InputTextModule,
    ToastModule,
    PanelModule,
    ButtonModule,
    FormsModule,
    MessageModule,
    ContextMenuModule,
    TableModule,
    MessageModule,
    MessagesModule,
    CalendarModule,
    AutoCompleteModule,
    InputTextareaModule,
    DropdownModule



  ],
  exports: [BomberoscreateComponent, BomberoslistComponent, BomberosupdateComponent, BomberosComponent, TiemposComponent,
    ComplementariosComponent]
})
export class BomberosModule { }
