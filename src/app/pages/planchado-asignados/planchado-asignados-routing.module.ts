import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanchadoAsignadosPage } from './planchado-asignados.page';

const routes: Routes = [
  {
    path: '',
    component: PlanchadoAsignadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanchadoAsignadosPageRoutingModule {}
