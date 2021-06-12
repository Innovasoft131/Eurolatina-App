import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanchadoAsignadosPageRoutingModule } from './planchado-asignados-routing.module';

import { PlanchadoAsignadosPage } from './planchado-asignados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanchadoAsignadosPageRoutingModule
  ],
  declarations: [PlanchadoAsignadosPage]
})
export class PlanchadoAsignadosPageModule {}
