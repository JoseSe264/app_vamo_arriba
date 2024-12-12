import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})
export class AdminPage implements OnInit {
  usuarios: any[] = [];
  listasDeCompra: any[] = [];
  productos: any[] = [];
  totalUsuarios: number = 0;
  totalListas: number = 0;
  cantidadProductos: number = 0;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private menuController: MenuController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadLists();
    this.loadProducts();
    this.loadStats();
  }

  openMenu() {
    this.menuController.open('first');
  }

  loadUsers() {
    this.firebaseService.getUsers().subscribe(users => {
      console.log('Usuarios cargados: ', users);
      this.usuarios = users;
    }, err => {
      console.error('Error al cargar los usuarios: ', err);
    });
  }

  loadLists() {
    this.firebaseService.getLists().subscribe(lists => {
      console.log('Listas de compra cargadas: ', lists);
      this.listasDeCompra = lists;
    }, err => {
      console.error('Error al cargar las listas: ', err);
    });
  }

  loadProducts() {
    this.firebaseService.getProducts().subscribe(products => {
      console.log('Productos cargados: ', products);
      this.productos = products;
    }, err => {
      console.error('Error al cargar los productos: ', err);
    });
  }

  loadStats() {
    this.firebaseService.getStats().subscribe(stats => {
      console.log('Estadísticas recibidas desde Firebase: ', stats);

      // Comprobar si stats tiene las propiedades esperadas
      if (stats) {
        this.totalUsuarios = stats.users ? stats.users : 0;
        this.totalListas = stats.lists ? stats.lists : 0;
        this.cantidadProductos = stats.products ? stats.products : 0;

        console.log('Total de usuarios: ', this.totalUsuarios);
        console.log('Total de listas: ', this.totalListas);
        console.log('Total de productos: ', this.cantidadProductos);
      } else {
        console.log('No se encontraron estadísticas.');
        this.totalUsuarios = 0;
        this.totalListas = 0;
        this.cantidadProductos = 0;
      }
    }, err => {
      console.error('Error al cargar las estadísticas: ', err);
      this.totalUsuarios = 0;
      this.totalListas = 0;
      this.cantidadProductos = 0;
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  async showAlert(message: string, isSuccess: boolean) {
    const alert = await this.alertController.create({
      header: isSuccess ? 'Éxito' : 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
