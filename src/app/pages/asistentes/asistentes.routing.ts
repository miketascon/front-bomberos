import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

import { AsistentesComponent } from './asistentes.component';

import { ListComponent } from './list/list.component';
import { AcuarteladosComponent } from './acuartelados/acuartelados.component';




const routes: Routes = [
  {
    path: '', component: AsistentesComponent, children: [
        {path: 'lista/:id', component: ListComponent, canActivate: [AuthGuard]},
        {path: 'acuartelados/:id', component: AcuarteladosComponent, canActivate: [AuthGuard]},
    ]
  }
];


@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AsistenteRoutingModule { }
