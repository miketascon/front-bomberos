import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { PersonalRoutingModule } from './personal.routing';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { PersonallistComponent } from './personallist/personallist.component';




@NgModule({
  declarations: [PersonalComponent, PersonallistComponent],
  imports: [
    CommonModule,
    PersonalRoutingModule,
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
  exports: [PersonalComponent, PersonallistComponent],
})
export class PersonalModule { }
