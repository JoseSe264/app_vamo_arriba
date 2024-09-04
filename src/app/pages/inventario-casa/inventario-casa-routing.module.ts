import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventarioCasaPage } from './inventario-casa.page';

const routes: Routes = [
  {
    path: '',
    component: InventarioCasaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioCasaPageRoutingModule {}
