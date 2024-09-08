import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
})
export class ListasPage {
  nombreLista: string = '';
  nombreProducto: string = '';
  
  // Listas de compras
  listas: Array<{ nombre: string, productos: string[] }> = [];

  constructor(private alertController: AlertController) {}

  // Agregar nueva lista
  agregarLista() {
    if (this.nombreLista.trim().length > 0) {
      this.listas.push({ nombre: this.nombreLista, productos: [] });
      this.nombreLista = '';  // Limpiar el input
    }
  }

  // Editar el nombre de la lista
  async editarLista(lista: any) {
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: lista.nombre,
          placeholder: 'Nuevo nombre de la lista'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.nombre.trim()) {
              lista.nombre = data.nombre;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  // Eliminar lista
  eliminarLista(lista: any) {
    this.listas = this.listas.filter(l => l !== lista);
  }

  // Agregar producto a la lista seleccionada
  agregarProducto(lista: any) {
    if (this.nombreProducto.trim().length > 0) {
      lista.productos.push(this.nombreProducto);
      this.nombreProducto = '';  // Limpiar el input
    }
  }

  // Editar producto de  lista
  async editarProducto(lista: any, producto: string) {
    const alert = await this.alertController.create({
      header: 'Editar producto',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: producto,
          placeholder: 'Nuevo nombre del producto'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.nombre.trim()) {
              const index = lista.productos.indexOf(producto);
              if (index > -1) {
                lista.productos[index] = data.nombre;
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }
  // Eliminar producto
  eliminarProducto(lista: any, producto: string) {
    const index = lista.productos.indexOf(producto);
    if (index > -1) {
      lista.productos.splice(index, 1);  // Elimina el producto del  índice 
    }
  }
}