import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path:'list',
    component:ListComponent
  },
  {
    path:'login',
    component:ManageComponent
  },
  {
    path:'secondFactor/:id',
    component:ManageComponent
  },
  {
    path:'view/:id',
    component:ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
