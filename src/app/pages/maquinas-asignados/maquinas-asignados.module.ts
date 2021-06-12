import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaquinasAsignadosPageRoutingModule } from './maquinas-asignados-routing.module';

import { MaquinasAsignadosPage } from './maquinas-asignados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaquinasAsignadosPageRoutingModule
  ],
  declarations: [MaquinasAsignadosPage]
})
export class MaquinasAsignadosPageModule {}
