import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinasAsignadosPage } from './maquinas-asignados.page';

const routes: Routes = [
  {
    path: '',
    component: MaquinasAsignadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinasAsignadosPageRoutingModule {}
