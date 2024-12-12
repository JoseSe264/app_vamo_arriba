import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminRoutingModule } from './admin-routing.module'; // Cambiado a AdminRoutingModule
import { AdminPage } from './admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminRoutingModule,  // Usa AdminRoutingModule aquí
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
