import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { BomberosComponent } from './bomberos.component';
import { BomberoslistComponent } from './bomberoslist/bomberoslist.component';
import { BomberoscreateComponent } from './bomberoscreate/bomberoscreate.component';
import { BomberosupdateComponent } from './bomberosupdate/bomberosupdate.component';
import { TiemposComponent } from './tiempos/tiempos.component';
import { ComplementariosComponent } from './complementarios/complementarios.component';



const routes: Routes = [
  {
    path: '', component: BomberosComponent, children: [
      {path: 'lista', component: BomberoslistComponent, canActivate: [AuthGuard]},
      {path: 'crear', component: BomberoscreateComponent, canActivate: [AuthGuard]},
      {path: 'basica/:id', component: BomberosupdateComponent , canActivate: [AuthGuard]},
      {path: 'tiempos/:id', component: TiemposComponent , canActivate: [AuthGuard]},
      {path: 'complementarios/:id', component: ComplementariosComponent , canActivate: [AuthGuard]},
    ]
  }

];


@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BomberosRoutingModule { }
