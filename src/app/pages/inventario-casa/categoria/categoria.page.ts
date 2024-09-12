import { Component, ViewChild , OnInit} from '@angular/core';
import { NavController } from '@ionic/angular';
<<<<<<< HEAD
import { Product } from 'src/app/models/product.model';
=======
import { IonAccordionGroup } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';

>>>>>>> d723680ff25183ffc0257ebf5d7263fba957441f

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})

export class CategoriaPage implements OnInit {
  @ViewChild('accordionGroup') accordionGroup!: IonAccordionGroup;
  isAccordionExpanded = false;

  recentProducts: Product[] = [
    {
      id: '1',
      title: 'iPhone 14',
      description: 'Teléfono encontrado en el primer piso cerca de la entrada principal',
      imageUrl: 'https://d1aqw5mz0wngqe.cloudfront.net/images/spree/images/2123123/attachments/large/Apple_iPhone_14_Midnight_1A.jpg?1678205819',
      status: 'Encontrado',
      location: 'Piso 1',
      dateReported: new Date(),
    },
    {
      id: '2',
      title: 'Mochila Negra',
      description: 'Mochila negra perdida en el laboratorio de computación',
      imageUrl: 'https://saxoline.cl/cdn/shop/files/be80f11798a3621a23baa2c2ef8ad8cba04f77fdad9add5abcf048dce2a187ac_2000x.jpg?v=1687469550',
      status: 'Reportado',
      location: 'LPC10+1',
      dateReported: new Date(),
    }
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    console.log('Componente categoría inicializado');
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
    this.navCtrl.navigateForward('/src/app/pages/login');
  }
}
