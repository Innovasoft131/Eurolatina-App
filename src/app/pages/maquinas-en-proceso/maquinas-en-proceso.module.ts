import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaquinasEnProcesoPageRoutingModule } from './maquinas-en-proceso-routing.module';

import { MaquinasEnProcesoPage } from './maquinas-en-proceso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaquinasEnProcesoPageRoutingModule
  ],
  declarations: [MaquinasEnProcesoPage]
})
export class MaquinasEnProcesoPageModule {}
