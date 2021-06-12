import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaquinasMaquinasPageRoutingModule } from './maquinas-maquinas-routing.module';

import { MaquinasMaquinasPage } from './maquinas-maquinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaquinasMaquinasPageRoutingModule
  ],
  declarations: [MaquinasMaquinasPage]
})
export class MaquinasMaquinasPageModule {}
