import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsistentesComponent } from './asistentes.component';
import { AsistenteRoutingModule } from './asistentes.routing';
import { ListComponent } from './list/list.component';
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
import { AcuarteladosComponent } from './acuartelados/acuartelados.component';



@NgModule({
  declarations: [AsistentesComponent, ListComponent, AcuarteladosComponent, ],
  imports: [
    CommonModule,
    AsistenteRoutingModule,
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
    DropdownModule
  ]
})
export class AistentesModule { }
