import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  constructor(private navCtrl: NavController ) { }

  ngOnInit() {
      
  console.log('')

  }

  navigateTocategoria(){
    this.navCtrl.navigateForward('/inventario-casa/categoria');
  }

  navigateToproducto(){
    this.navCtrl.navigateForward('/inventario-casa/producto');
  }
  

  navigateToproductoEdit(){

    this.navCtrl.navigateForward('/inventario-casa/producto-edit');
  }

}
