import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

import { ListavehiculosComponent } from './listavehiculos/listavehiculos.component';
import { VehiculosComponent } from './vehiculos.component';
import { LesionadosComponent } from './lesionados/lesionados.component';






const routes: Routes = [
  {
    path: '', component: VehiculosComponent, children: [
        {path: 'lista/:id', component: ListavehiculosComponent, canActivate: [AuthGuard]},
        {path: 'lesionados/:id', component: LesionadosComponent, canActivate: [AuthGuard]},
    ]
  }
];


@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
