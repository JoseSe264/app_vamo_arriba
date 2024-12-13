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

  // Abrir el menú lateral
  openMenu() {
    this.menuController.open('first');
  }

  // Cargar usuarios desde Firebase
  loadUsers() {
    this.firebaseService.getAllUsers().subscribe(
      users => {
        console.log('Usuarios cargados:', users);
        this.usuarios = users;
        this.totalUsuarios = users.length; // Actualizar el total de usuarios
      },
      err => {
        console.error('Error al cargar los usuarios:', err);
        this.totalUsuarios = 0; // En caso de error, asegura que sea 0
      }
    );
  }

  // Cargar listas de compra desde Firebase
  loadLists() {
    this.firebaseService.getLists().subscribe(
      lists => {
        console.log('Listas de compra cargadas:', lists);
        this.listasDeCompra = lists;
        this.totalListas = lists.length; // Actualizar el total de listas
      },
      err => {
        console.error('Error al cargar las listas:', err);
        this.totalListas = 0; // En caso de error, asegura que sea 0
      }
    );
  }

  // Cargar productos desde Firebase
  loadProducts() {
    this.firebaseService.getProducts().subscribe(
      products => {
        console.log('Productos cargados:', products);
        this.productos = products;
        this.cantidadProductos = products.length; // Actualizar el total de productos
      },
      err => {
        console.error('Error al cargar los productos:', err);
        this.cantidadProductos = 0; // En caso de error, asegura que sea 0
      }
    );
  }

  // Cargar estadísticas desde Firebase (usuarios, listas, productos)
  loadStats() {
    this.firebaseService.getStats().subscribe(
      stats => {
        console.log('Estadísticas recibidas desde Firebase:', stats);

        if (stats) {
          this.totalUsuarios = stats.users || 0;
          this.totalListas = stats.lists || 0;
          this.cantidadProductos = stats.products || 0;

          console.log('Total de usuarios:', this.totalUsuarios);
          console.log('Total de listas:', this.totalListas);
          console.log('Total de productos:', this.cantidadProductos);
        } else {
          this.totalUsuarios = 0;
          this.totalListas = 0;
          this.cantidadProductos = 0;
        }
      },
      err => {
        console.error('Error al cargar las estadísticas:', err);
        this.totalUsuarios = 0;
        this.totalListas = 0;
        this.cantidadProductos = 0;
      }
    );
  }

  // Cerrar sesión y navegar a la página de login
  logout() {
    this.router.navigate(['/login']);
  }

  // Mostrar una alerta de éxito o error
  async showAlert(message: string, isSuccess: boolean) {
    const alert = await this.alertController.create({
      header: isSuccess ? 'Éxito' : 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
