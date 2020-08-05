import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing';




@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [
    CommonModule,
    InputTextModule,
    MessageModule,
    PanelModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    AuthRoutingModule

  ]
})
export class AuthModule { }
