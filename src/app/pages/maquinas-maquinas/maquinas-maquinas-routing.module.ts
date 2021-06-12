import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinasMaquinasPage } from './maquinas-maquinas.page';

const routes: Routes = [
  {
    path: '',
    component: MaquinasMaquinasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinasMaquinasPageRoutingModule {}
