import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importa el Router de Angular

@Component({
  selector: 'app-inventario-casa',
  templateUrl: './inventario-casa.page.html',
  styleUrls: ['./inventario-casa.page.scss'],
})
export class InventarioCasaPage implements OnInit {

  constructor(private router: Router) {}  // Inyecta el servicio Router

  ngOnInit() {
  }

  // Funciones de navegación
  navigateTocategoria() {
    this.router.navigate(['/inventario-casa/categoria']);  // Navega a la página de Categoría
  }

  navigateToproducto() {
    this.router.navigate(['/inventario-casa/producto']);  // Navega a la página de Producto
  }

  navigateToproductoEdit() {
    this.router.navigate(['/inventario-casa/productoEdit']);  // Navega a la página de Producto Editar
  }
  navigateToPrincipal() {
    this.router.navigate(['/inventario-casa/principal']);  // Navega a la página de Producto Editar
  }


}
