import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/components/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { ListaCompraPageRoutingModule } from './lista-compra-routing.module';

import { ListasPage } from './lista-compra.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,  // Importando el módulo SharedModule que contiene los componentes comunes y reutilizables.
    IonicModule,
    ListaCompraPageRoutingModule
  ],
  declarations: [ListasPage]
})
export class ListaCompraPageModule {}
