import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ListaService } from '../../services/lista.service'; // Importa el servicio

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListasPage {
  listas: any[] = [];
  nuevoProducto: string = '';
  nombreLista: string = '';
  nombreProducto: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private listaService: ListaService // Inyecta el servicio
  ) {
    this.cargarListas();
  }

  // Agregar nueva lista a Firebase
  async agregarNuevaLista() {
    const alert = await this.alertController.create({
      header: 'Nueva Lista',
      inputs: [
        {
          name: 'nombreLista',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Agregar lista cancelado');
          }
        }, {
          text: 'Agregar',
          handler: (data) => {
            if (data.nombreLista.trim() !== '') {
              const nuevaLista = { nombre: data.nombreLista, productos: [] };
              this.listas.push(nuevaLista);
              this.listaService.createLista(nuevaLista); // Guarda la lista en Firebase
              this.guardarListas();
            } else {
              console.log('Nombre de la lista vacío');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // Cargar listas desde Firebase
  cargarListas() {
    this.listaService.getListas().subscribe(listas => {
      this.listas = listas;
      console.log('Listas cargadas desde Firebase:', this.listas);
    });
  }

  agregarProducto(lista: any) {
    if (this.nuevoProducto.trim() !== '') {
      lista.productos.push(this.nuevoProducto);
      this.listaService.updateLista(lista.key, lista); // Actualiza la lista en Firebase
      this.nuevoProducto = '';
    }
  }

  eliminarProducto(lista: any, producto: string) {
    const index = lista.productos.indexOf(producto);
    if (index > -1) {
      lista.productos.splice(index, 1);
      this.listaService.updateLista(lista.key, lista); // Actualiza la lista en Firebase
    }
  }

  eliminarLista(lista: any) {
    this.listas = this.listas.filter(l => l !== lista);
    this.listaService.deleteLista(lista.key); // Elimina la lista de Firebase
    alert('Lista eliminada');
  }

  guardarListas() {
    alert('Listas guardadas con éxito');
    console.log('Listas guardadas:', this.listas);
  }

  volver() {
    this.navCtrl.back();
  }

  limpiarLocalStorage() {
    console.log('limpiarLocalStorage');// logica de limpiar todas las listas
  }

  editarLista(lista: any) {
    console.log('editarLista', lista); // logica de actualizar la lista
  }
}
