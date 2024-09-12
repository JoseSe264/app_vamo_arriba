import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }

  // Navegar a una categoría específica
  navigateToCategoria(categoria: string) {
    // Implementa la lógica para navegar a la página de la categoría seleccionada
    // Por ejemplo, podrías usar una ruta específica o un parámetro para la navegación
    this.navCtrl.navigateForward(`/categoria/${categoria}`);
  }

  // Navegar a la página de añadir nueva categoría
  addNewCategory() {
    // Implementa la lógica para navegar a la página de añadir nueva categoría
    this.navCtrl.navigateForward('/add-category');
  }
}

