import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PruebasPaginasPage } from './pruebas-paginas.page';

const routes: Routes = [
  {
    path: '',
    component: PruebasPaginasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PruebasPaginasPageRoutingModule {}
