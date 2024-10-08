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
    {
      id: '1',
      nombre: 'Leche Entera',
      descripcion: 'Leche fresca, en botella de 1 litro.',
      cantidad: 20,
      categoria: 'No Refrigerado',
      precio: 1.50,
      status: 'Disponible',
      imagenUrl: ''
    },
    {
      id: '2',
      nombre: 'Yogur Griego',
      descripcion: 'Yogur griego natural, en envase de 500g.',
      cantidad: 10,
      categoria: 'Refrigerados',
      precio: 3.20,
      status: 'Bajo Stock',
      imagenUrl: 'assets/images/yogur.jpg'
    },
    {
      id: '3',
      nombre: 'Helado de Chocolate',
      descripcion: 'Helado de chocolate, en caja de 2 litros.',
      cantidad: 5,
      categoria: 'Congelados',
      precio: 4.50,
      status: 'Agotado',
      imagenUrl: 'assets/images/helado.jpg'
    }
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    console.log('Componente ProductoPage inicializado');
  }

  toggleAccordion() {
    if (this.accordionGroup) {
      this.isAccordionExpanded = !this.isAccordionExpanded;
      this.accordionGroup.value = this.isAccordionExpanded
        ? ['Refrigerados', 'No Refrigerados', '']
        : [];
    }
  }

  navigateTocategoria() {
    this.navCtrl.navigateForward('/inventario-casa/categoria');
  }

  navigateToproducto() {
    this.navCtrl.navigateForward('/inventario-casa/producto');
  }

  navigateToproductoEdit(id: string | undefined) {
    if (id) {
      this.navCtrl.navigateForward(`/inventario-casa/producto-edit/${id}`);
    } else {
      // Manejar el caso cuando id es undefined
      console.error('El ID del producto no está definido');
    }
  }

  navegarANuevoProducto() {
    this.navCtrl.navigateForward('/inventario-casa/nuevo-producto');
  }

  navigateTologin() {
    this.navCtrl.navigateForward('/src/app/pages/login/login');
  }
}
