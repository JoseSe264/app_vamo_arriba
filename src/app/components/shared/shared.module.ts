import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { HeaderCustomComponent } from '../header-custom/header-custom.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductListComponent,
    
    HeaderCustomComponent,  // Agrega HeaderCustomComponent al módulo SharedModule
    ProductFormComponent,  // Agrega ProductFormComponent al módulo SharedModule
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,  // Importa RouterModule para usar rutas en otros componentes del módulo SharedModule
    ReactiveFormsModule,  // Importa ReactiveFormsModule para usar formularios reactivos en ProductFormComponent
    IonicModule
  ],
  exports: [
    SearchBarComponent,
    ProductCardComponent,
    HeaderCustomComponent,  // Exporta HeaderCustomComponent para que pueda ser usado en otros módulos
    ProductFormComponent,  // Exporta ProductFormComponent para que pueda ser usado en otros módulos
    ProductListComponent  // Exporta los componentes para que puedan ser usados en otros módulos
  ]  
})
export class SharedModule { }
