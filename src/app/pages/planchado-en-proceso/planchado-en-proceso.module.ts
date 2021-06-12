import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanchadoEnProcesoPageRoutingModule } from './planchado-en-proceso-routing.module';

import { PlanchadoEnProcesoPage } from './planchado-en-proceso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanchadoEnProcesoPageRoutingModule
  ],
  declarations: [PlanchadoEnProcesoPage]
})
export class PlanchadoEnProcesoPageModule {}
