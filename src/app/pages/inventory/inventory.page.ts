import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service'; // Asegúrate de que la ruta es correcta
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  productForm: FormGroup;
  products$: Observable<Product[]>;
  showForm = false;
  isEditing = false;
  currentProduct: Product | null = null; // Producto actual en edición
  categorias = ['Alimentos', 'Limpieza', 'Electrónica']; // Ejemplo de categorías

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: [0, Validators.required],
      categoria: ['', Validators.required],
      fechaExpiracion: ['', Validators.required],
      precio: [0, Validators.required],
      status: ['Disponible', Validators.required],
      imagenUrl: ['']
    });
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEditing = false; // Reseteamos el estado de edición
      this.productForm.reset(); // Limpiar formulario
    }
  }

  saveProduct(): void {
    const productData = this.productForm.value;

    if (this.isEditing && this.currentProduct) {
      // Si estamos editando, actualizamos el producto
      productData.id = this.currentProduct.id;
      this.productService.updateProduct(productData); // Asume que updateProduct no devuelve un observable
      console.log('Producto actualizado');
      this.resetForm();
    } else {
      // Si no estamos editando, agregamos un nuevo producto
      this.productService.addProduct(productData); // Asume que addProduct no devuelve un observable
      console.log('Producto agregado');
      this.resetForm();
    }
  }

  editProduct(product: Product): void {
    this.currentProduct = product;
    this.productForm.patchValue(product); // Llenar el formulario con los datos del producto
    this.isEditing = true;
    this.showForm = true; // Mostrar el formulario en modo edición
  }

  removeProduct(id: string): void {
    this.productService.removeProduct(id); // Asume que removeProduct no devuelve un observable
    console.log('Producto eliminado');
  }

  resetForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.productForm.reset();
  }
}
