import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanchadoPageRoutingModule } from './planchado-routing.module';

import { PlanchadoPage } from './planchado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanchadoPageRoutingModule
  ],
  declarations: [PlanchadoPage]
})
export class PlanchadoPageModule {}
