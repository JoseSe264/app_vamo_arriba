import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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

  constructor(private alertController: AlertController) {
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
              this.listas.push({ nombre: data.nombreLista, productos: [] });
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
  agregarLista() {
    if (this.nombreLista.trim().length > 0) {
      this.listas.push({ nombre: this.nombreLista, productos: [] });
      this.nombreLista = '';  // Limpiar el input
    }}
  limpiarLocalStorage() {
    localStorage.clear();
    this.listas = []; // Reiniciar la variable listas
    console.log('lista limpiada');
  }
  cargarListas() {
    const storedListas = localStorage.getItem('listas');
    
    if (!storedListas || storedListas === 'null' || storedListas === '[]') {
      // Si no hay listas o están vacías, limpiar y agregar una lista predeterminada
      localStorage.clear();
      this.listas = [
        { nombre: 'Lista de prueba', productos: ['Pan', 'Leche', 'Huevos'] }
      ];
    } else {
      this.listas = JSON.parse(storedListas);
    }
    console.log(this.listas); // Para verificar si las listas están cargadas correctamente
  }

  agregarProducto(lista: any) {
    if (this.nuevoProducto.trim() !== '') {
      lista.productos.push(this.nuevoProducto);
      this.nuevoProducto = '';
    }
  }

  eliminarProducto(lista: any, producto: string) {
    const index = lista.productos.indexOf(producto);
    if (index > -1) {
      lista.productos.splice(index, 1);
    }
  }

  editarLista(lista: any) {
    console.log('Editar lista', lista);
  }

  eliminarLista(lista: any) {
    this.listas = this.listas.filter(l => l !== lista);
  }

  guardarListas() {
    // Guardar listas en localStorage
    localStorage.setItem('listas', JSON.stringify(this.listas));
    console.log('Listas guardadas:', this.listas);
  }

  cancelar() {
    console.log('Acción de cancelar');
  }
}
