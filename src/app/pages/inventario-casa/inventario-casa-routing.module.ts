import { NgModule } from '@angular/core';
import {PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal/principal.page';
import { CategoriaPage } from './categoria/categoria.page';
import { ProductoPage } from './producto/producto.page';
import { ProductoEditPage } from './producto-edit/producto-edit.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    loadChildren: () => import('./principal/principal.module').then(m => m.PrincipalPageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaPageModule)
  },
  {
    path: 'producto',
    loadChildren: () => import('./producto/producto.module').then(m => m.ProductoPageModule)
  },
  {
    path: 'producto-edit',
    loadChildren: () => import('./producto-edit/producto-edit.module').then(m => m.ProductoEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioCasaPageRoutingModule {}