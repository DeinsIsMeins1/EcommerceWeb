import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarDireccionesPage } from './agregar-direcciones.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarDireccionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarDireccionesPageRoutingModule {}
