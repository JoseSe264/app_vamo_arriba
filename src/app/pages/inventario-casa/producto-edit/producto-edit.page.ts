import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.page.html',
  styleUrls: ['./producto-edit.page.scss'],
})
export class ProductoEditPage implements OnInit {
  @ViewChild('accordionGroup') accordionGroup!: IonAccordionGroup;
  isAccordionExpanded = false;

  recentProducts: Product[] = [
    //... definición de productos
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    console.log('Componente ProductoEditPage inicializado');

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
