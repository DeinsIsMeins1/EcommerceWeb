import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarDireccionesPageRoutingModule } from './agregar-direcciones-routing.module';

import { AgregarDireccionesPage } from './agregar-direcciones.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarDireccionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AgregarDireccionesPage]
})
export class AgregarDireccionesPageModule {}
