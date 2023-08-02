import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebasPaginasPageRoutingModule } from './pruebas-paginas-routing.module';

import { PruebasPaginasPage } from './pruebas-paginas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebasPaginasPageRoutingModule
  ],
  declarations: [PruebasPaginasPage]
})
export class PruebasPaginasPageModule {}
