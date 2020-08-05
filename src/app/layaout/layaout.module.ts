import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    ConfirmDialogModule,
    FormsModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    MessageModule,
    MessagesModule // Para que enrute en el html
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  providers: [ConfirmationService, MessageService]
})
export class LayaoutModule { }
