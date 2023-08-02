import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaBusquedaPageRoutingModule } from './lista-busqueda-routing.module';

import { ListaBusquedaPage } from './lista-busqueda.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaBusquedaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ListaBusquedaPage]
})
export class ListaBusquedaPageModule {}
