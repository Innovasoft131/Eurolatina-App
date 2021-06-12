import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanchadoMaquinasPage } from './planchado-maquinas.page';

const routes: Routes = [
  {
    path: '',
    component: PlanchadoMaquinasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanchadoMaquinasPageRoutingModule {}
