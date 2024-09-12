import { Component, OnInit } from '@angular/core'; 
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  categorias = [
    { id: 1, nombre: 'No Refrigerado' },
    { id: 2, nombre: 'Refrigerados' },
    { id: 3, nombre: 'Congelados' }
    // Agrega más categorías según sea necesario
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    console.log('Pantalla de Categorías cargada');
  }

  // Función para seleccionar una categoría y mostrar su información en la consola
  seleccionarCategoria(categoria: { id: number, nombre: string }) {
    console.log('Categoría seleccionada:', categoria.nombre);
    // Aquí puedes implementar la lógica para redirigir a una página de productos relacionados
    // Por ejemplo: this.navCtrl.navigateForward(`/productos/${categoria.id}`);
  }

  // Navegar a la pantalla para añadir una nueva categoría
  anadirCategoria() {
    this.navCtrl.navigateForward('/inventario-casa/nueva-categoria');
  }
  

  // Navegación entre pantallas
  navigateTocategoria(){
    this.navCtrl.navigateForward('/inventario-casa/categoria');
  }

  navigateToproducto(){
    this.navCtrl.navigateForward('/inventario-casa/producto');
  }
  
  navigateToproductoEdit(){
    this.navCtrl.navigateForward('/inventario-casa/producto-edit');
  }

  // Navegar a la pantalla de inicio
  navigateToInicio() {
    this.navCtrl.navigateBack('/inicio');
  }
}
