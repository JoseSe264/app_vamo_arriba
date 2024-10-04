import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { CategoriaPageRoutingModule } from './categoria-routing.module';
import { CategoriaPage } from './categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPageRoutingModule,
    SharedModule
  ],
  declarations: [CategoriaPage]
})
export class CategoriaPageModule {}
