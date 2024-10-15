import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { InventoryPageRoutingModule } from './inventory-routing.module';

import { InventoryPage } from './inventory.page';
import { SharedModule } from 'src/app/components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    SharedModule,
    InventoryPageRoutingModule,
  ],
  declarations: [InventoryPage]
})
export class InventoryPageModule {}
