import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanchadoMaquinasPageRoutingModule } from './planchado-maquinas-routing.module';

import { PlanchadoMaquinasPage } from './planchado-maquinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanchadoMaquinasPageRoutingModule
  ],
  declarations: [PlanchadoMaquinasPage]
})
export class PlanchadoMaquinasPageModule {}
