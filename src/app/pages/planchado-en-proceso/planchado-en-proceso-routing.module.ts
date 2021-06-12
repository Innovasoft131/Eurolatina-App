import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanchadoEnProcesoPage } from './planchado-en-proceso.page';

const routes: Routes = [
  {
    path: '',
    component: PlanchadoEnProcesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanchadoEnProcesoPageRoutingModule {}
