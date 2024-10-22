import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent  implements OnInit {
  @Input() product?: Product ; // Recibe un objeto Product como entrada


  constructor() { }
  
  getStatusColor(status: 'Disponible' | 'Bajo Stock' | 'Agotado'): string {
  if (!status){
    return 'medium';
  }
    switch (status) {
      case 'Disponible':
        return 'success';    // Verde
      case 'Bajo Stock':
        return 'warning';    // Amarillo
      case 'Agotado':
        return 'danger';     // Rojo
      default:
        return 'medium';     // Un color neutral
    }
  }




  ngOnInit() {}

}
