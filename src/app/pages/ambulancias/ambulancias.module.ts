import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbulanciasComponent } from './ambulancias.component';
import { ListaComponent } from './lista/lista.component';
import { AmbulanciasRoutingModule } from './ambulancias.routing';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ AmbulanciasComponent, ListaComponent],
  imports: [
    CommonModule,
    AmbulanciasRoutingModule,
    ToastModule,
    TableModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    ContextMenuModule,
    ButtonModule,
    DialogModule,
    FormsModule

  ],
  exports: [AmbulanciasComponent, ListaComponent]
})
export class AmbulanciasModule { }
