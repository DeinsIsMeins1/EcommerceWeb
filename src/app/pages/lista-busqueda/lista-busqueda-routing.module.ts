import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaBusquedaPage } from './lista-busqueda.page';

const routes: Routes = [
  {
    path: '',
    component: ListaBusquedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaBusquedaPageRoutingModule {}
