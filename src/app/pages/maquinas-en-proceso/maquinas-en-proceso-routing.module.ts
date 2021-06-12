import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaquinasEnProcesoPage } from './maquinas-en-proceso.page';

const routes: Routes = [
  {
    path: '',
    component: MaquinasEnProcesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaquinasEnProcesoPageRoutingModule {}
