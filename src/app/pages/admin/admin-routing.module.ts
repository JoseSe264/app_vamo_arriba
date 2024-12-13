import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './admin.page';  // Debe importar correctamente AdminPage
import { Component } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AdminPage  // Asegúrate de que AdminPage esté configurado aquí
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),

  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
