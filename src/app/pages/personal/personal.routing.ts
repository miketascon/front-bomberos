import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { PersonalComponent } from './personal.component';
import { PersonallistComponent } from './personallist/personallist.component';






const routes: Routes = [
  {
    path: '', component: PersonalComponent, children: [
      {path: 'lista', component: PersonallistComponent, canActivate: [AuthGuard]},
    ]
  }

];


@NgModule({
  imports: [
   RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PersonalRoutingModule { }
