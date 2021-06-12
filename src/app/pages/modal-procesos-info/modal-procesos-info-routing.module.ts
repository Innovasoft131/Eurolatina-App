import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalProcesosInfoPage } from './modal-procesos-info.page';

const routes: Routes = [
  {
    path: '',
    component: ModalProcesosInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalProcesosInfoPageRoutingModule {}
