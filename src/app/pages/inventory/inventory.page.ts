import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  productForm: FormGroup;
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  showForm = false;
  isEditing = false;
  currentProduct: Product | null = null;
  categorias = ['Alimentos', 'Limpieza', 'Electrónica'];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]], // Nombre mínimo de 3 caracteres
      descripcion: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]], // Mínimo de cantidad es 1
      categoria: ['', Validators.required],
      fechaExpiracion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]], // El precio debe ser mayor a 0
      status: [{ value: 'Disponible', disabled: true }, Validators.required],
      imagenUrl: ['']
    });

    // Detectar cambios en el campo 'cantidad' para actualizar el estado
    this.productForm.get('cantidad').valueChanges.subscribe(cantidad => {
      this.updateProductStatus(cantidad);
    });
  }

  ngOnInit() {
    this.products$ = this.productService.getProducts();
    this.filteredProducts$ = this.products$;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEditing = false;
      this.productForm.reset();
    }
  }

  onSearchTermChanged(searchTerm: string) {
    if (!searchTerm) {
      this.filteredProducts$ = this.products$;
    } else {
      this.filteredProducts$ = this.products$.pipe(
        map(products => products.filter(product =>
          product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
  }

  saveProduct(): void {
    // Verifica si el formulario es inválido
    if (this.productForm.invalid) {
      console.log('El formulario es inválido. No se puede guardar el producto.');
      return; // Salimos si el formulario es inválido para evitar el guardado
    }
  
    const productData = this.productForm.value;
    
    // Asignar el estado según la cantidad
    productData.status = this.getProductStatus(this.productForm.get('cantidad').value);
  
    if (this.isEditing && this.currentProduct) {
      productData.id = this.currentProduct.id;
      this.productService.updateProduct(productData);
      console.log('Producto actualizado');
    } else {
      this.productService.addProduct(productData);
      console.log('Producto agregado');
    }
  
    // Restablecer el formulario después de guardar
    this.resetForm();
  }
  

  editProduct(product: Product): void {
    this.currentProduct = product;
    this.productForm.patchValue(product);
    this.isEditing = true;
    this.showForm = true;
  }

  removeProduct(id: string): void {
    this.productService.removeProduct(id).subscribe(
      () => {
        console.log('Producto eliminado correctamente');
      },
      (error) => console.error('Error al eliminar producto:', error)
    );
  }

  resetForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.productForm.reset();
  }

  // Función para cambiar el estado del producto basado en la cantidad
  updateProductStatus(cantidad: number): void {
    const statusControl = this.productForm.get('status');
    statusControl.setValue(this.getProductStatus(cantidad));
  }

  // Retorna el estado según la cantidad
  getProductStatus(cantidad: number): string {
    if (cantidad === 0) {
      return 'Agotado';
    } else if (cantidad <= 5) {
      return 'Bajo Stock';
    } else {
      return 'Disponible';
    }
  }

  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // Puedes cambiar a CameraSource.Camera si prefieres tomar una foto en vez de seleccionar de la galería
      });
  
      // Actualiza la URL de la imagen en el formulario
      this.productForm.patchValue({
        imagenUrl: image.webPath // La imagen seleccionada se guarda en la propiedad 'imagenUrl'
      });
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }
  



}
