import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioCasaPageRoutingModule } from './inventario-casa-routing.module';

import { InventarioCasaPage } from './inventario-casa.page';
import { PrincipalPageRoutingModule } from './principal/principal-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioCasaPageRoutingModule,
    PrincipalPageRoutingModule
  ],
  declarations: [InventarioCasaPage]
})
export class InventarioCasaPageModule {}
