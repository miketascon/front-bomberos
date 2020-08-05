import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { VehiculosModule } from './vehiculos/vehiculos.module';



const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'incidentes', loadChildren: () => import('./bomberos/bomberos.module').then(m => m.BomberosModule)},
      {path: 'ambulancias', loadChildren: () => import('./ambulancias/ambulancias.module').then(m => m.AmbulanciasModule)},
      {path: 'personal', loadChildren: () => import('./personal/personal.module').then(m => m.PersonalModule)},
      {path: 'asistentes', loadChildren: () => import('./asistentes/aistentes.module').then(m => m.AistentesModule)},
      {path: 'vehiculos', loadChildren: () => import('./vehiculos/vehiculos.module').then(m => m.VehiculosModule)},


    ]
  }

];


@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
