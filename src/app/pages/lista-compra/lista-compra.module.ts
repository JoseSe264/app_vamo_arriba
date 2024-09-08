import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCompraPageRoutingModule } from './lista-compra-routing.module';

import { ListasPage } from './lista-compra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCompraPageRoutingModule
  ],
  declarations: [ListasPage]
})
export class ListaCompraPageModule {}
