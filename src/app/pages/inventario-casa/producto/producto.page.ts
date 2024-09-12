import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {
  @ViewChild('accordionGroup') accordionGroup!: IonAccordionGroup;
  isAccordionExpanded = false;

  recentProducts: Product[] = [
    //... definición de productos
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    console.log('Componente ProductoPage inicializado');
  }

  toggleAccordion() {
    if (this.accordionGroup) {
      this.isAccordionExpanded = !this.isAccordionExpanded;
      this.accordionGroup.value = this.isAccordionExpanded
        ? ['Frescos', 'No Perecederos', 'Bebidas']
        : [];
    }
  }

  navigateTocategoria() {
    this.navCtrl.navigateForward('/inventario-casa/categoria');
  }

  navigateToproducto() {
    this.navCtrl.navigateForward('/inventario-casa/producto');
  }

  navigateToproductoEdit() {
    this.navCtrl.navigateForward('/inventario-casa/producto-edit');
  }

  navigateTologin() {
    this.navCtrl.navigateForward('/src/app/pages/login/login');
  }
}
