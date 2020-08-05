import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';
import { LayaoutModule } from '../layaout/layaout.module';
import { HomeComponent } from './home/home.component';
import { BomberosModule } from './bomberos/bomberos.module';
import { AmbulanciasModule } from './ambulancias/ambulancias.module';







@NgModule({
  declarations: [PagesComponent, HomeComponent, ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    BomberosModule,
    AmbulanciasModule,
    LayaoutModule,


  ],

})
export class PagesModule { }
