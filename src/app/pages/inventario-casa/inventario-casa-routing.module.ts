import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventarioCasaPage } from './inventario-casa.page';
import { CategoriaPage } from './categoria/categoria.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaPage
  },
  {
    path: 'categoria',
    loadChildren: () => import('./categoria/categoria.module').then( m => m.CategoriaPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./producto/producto.module').then( m => m.ProductoPageModule)
  },
  {
    path: 'producto-edit',
    loadChildren: () => import('./producto-edit/producto-edit.module').then( m => m.ProductoEditPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioCasaPageRoutingModule {}
