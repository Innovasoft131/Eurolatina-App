import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalProcesosInfoPageRoutingModule } from './modal-procesos-info-routing.module';

import { ModalProcesosInfoPage } from './modal-procesos-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalProcesosInfoPageRoutingModule
  ],
  declarations: [ModalProcesosInfoPage]
})
export class ModalProcesosInfoPageModule {}
