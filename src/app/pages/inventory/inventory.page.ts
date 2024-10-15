import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  productos$: Observable<Product[]>; // Observable para almacenar productos
  selectedProduct: Product | null = null; // Almacena el producto seleccionado para editar
  isFormHidden = true; // Controla la visibilidad del formulario, lo inicializas aquí
  isFormVisible = false; 
  constructor(private productService: ProductService) {
    this.productos$ = this.productService.getProducts(); // Obtiene los productos como Observable
  }

  ngOnInit() {
    // Aquí puedes agregar lógica adicional si es necesario
  }

  // Método para agregar un producto
  addProduct(product: Product) {
    this.productService.addProduct(product); // Agrega el producto usando el servicio
  }

  // Método para eliminar un producto
  removeProduct(id: string) {
    this.productService.removeProduct(id); // Elimina el producto usando el servicio
  }

  // Método para editar un producto
  editProduct(product: Product) {
    this.selectedProduct = { ...product }; // Guarda el producto seleccionado para editar
    this.isFormHidden = false;
  }

  // Método para confirmar la edición (puedes llamarlo al enviar el formulario)
  updateProduct(updatedProduct: Product) {
    this.productService.updateProduct(updatedProduct); // Actualiza el producto en el servicio
    this.selectedProduct = null; // Restablece el producto seleccionado
  }
  toggleForm() {
    this.isFormHidden = !this.isFormHidden; // Cambia la visibilidad del formulario
  }

}
