import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoEditPageRoutingModule } from './producto-edit-routing.module';

import { ProductoEditPage } from './producto-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoEditPageRoutingModule
  ],
  declarations: [ProductoEditPage]
})
export class ProductoEditPageModule {}
