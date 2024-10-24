import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ListaService } from '../../services/lista.service'; 
import { lista } from '../../models/lista.model'; // Import de la interfaz lista

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListasPage {
  listas: lista[] = [];
  nuevoProducto: string = '';
  
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private listaService: ListaService
  ) {
    this.cargarListas();
  }

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
              const nuevaLista: lista = { id: this.generateId(), nombrelista: data.nombreLista, nombreproducto: '' };
              this.listas.push(nuevaLista);
              this.listaService.createLista(nuevaLista);
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

  cargarListas() {
    this.listaService.getListas().subscribe(listas => {
      this.listas = listas;
      console.log('Listas cargadas desde Firebase:', this.listas);
    });
  }

  agregarProducto(lista: lista) {
    if (this.nuevoProducto.trim() !== '') {
      lista.nombreproducto = this.nuevoProducto;
      this.listaService.updateLista(lista.id!, lista);
      this.nuevoProducto = '';
    }
  }

  eliminarProducto(lista: lista, producto: string) {
    if (lista.nombreproducto === producto) {
      lista.nombreproducto = '';
      this.listaService.updateLista(lista.id!, lista);
    }
  }

  eliminarLista(lista: lista) {
    this.listas = this.listas.filter(l => l !== lista);
    this.listaService.deleteLista(lista.id!);
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
    console.log('limpiarLocalStorage');
  }

  editarLista(lista: lista) {
    console.log('editarLista', lista);
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}

