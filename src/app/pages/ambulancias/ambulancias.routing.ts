import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { AmbulanciasComponent } from './ambulancias.component';

import { ListaComponent } from './lista/lista.component';





const routes: Routes = [
  {
    path: '', component: AmbulanciasComponent, children: [
      {path: 'lista', component: ListaComponent, canActivate: [AuthGuard]},
    ]
  }

];


@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AmbulanciasRoutingModule { }
