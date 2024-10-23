import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  productForm: FormGroup;
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>; // Productos filtrados
  showForm = false;
  isEditing = false;
  currentProduct: Product | null = null; // Producto actual en edición
  categorias = ['Alimentos', 'Limpieza', 'Electrónica']; // Categorías de ejemplo

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
    // Obtiene todos los productos al iniciar
    this.products$ = this.productService.getProducts();
    this.filteredProducts$ = this.products$; // Inicialmente muestra todos los productos
  }

  // Alterna la visibilidad del formulario
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEditing = false; // Reseteamos el estado de edición
      this.productForm.reset(); // Limpiar formulario
    }
  }

  // Maneja el término de búsqueda y filtra productos
  onSearchTermChanged(searchTerm: string) {
    if (!searchTerm) {
      this.filteredProducts$ = this.products$; // Si no hay término de búsqueda, muestra todos los productos
    } else {
      this.filteredProducts$ = this.products$.pipe(
        map(products => products.filter(product => 
          product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
  }

  // Guarda o actualiza el producto
  saveProduct(): void {
    const productData = this.productForm.value;

    if (this.isEditing && this.currentProduct) {
      // Si estamos editando, actualizamos el producto
      productData.id = this.currentProduct.id;
      this.productService.updateProduct(productData);
      console.log('Producto actualizado');
      this.resetForm();
    } else {
      // Si no estamos editando, agregamos un nuevo producto
      this.productService.addProduct(productData);
      console.log('Producto agregado');
      this.resetForm();
    }
  }

  // Edita un producto
  editProduct(product: Product): void {
    this.currentProduct = product;
    this.productForm.patchValue(product); // Llenar el formulario con los datos del producto
    this.isEditing = true;
    this.showForm = true; // Mostrar el formulario en modo edición
  }

  // Elimina un producto
  removeProduct(id: string): void {
    this.productService.removeProduct(id).subscribe(
      () => {
        console.log('Producto eliminado correctamente');
        // Opcional: cargar productos de nuevo si necesitas refrescar la lista
      },
      (error) => console.error('Error al eliminar producto:', error)
    );
  }
  
  // Resetea el formulario
  resetForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.productForm.reset();
  }
}
