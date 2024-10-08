import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {


  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    loop: true,
    pagination: {
      clickable: true
    }
  };

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}





  navigateToCategoria(categoria: string) {
    this.navCtrl.navigateForward('/inventario/categoria');
  }

  navigateToproducto() {
    this.navCtrl.navigateForward('/inventario-casa/producto');
  }

  navigateToproductoEdit() {
    this.navCtrl.navigateForward('/inventario-casa/producto-edit');
  }

  addNewCategory() {
    this.navCtrl.navigateForward('/add-category');
  }

  navigateTocategoria() {
    this.navCtrl.navigateForward('/inventario-casa/categoria');
  }
}
