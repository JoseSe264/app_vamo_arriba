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
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      fechaExpiracion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
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
    this.filteredProducts$ = searchTerm
      ? this.products$.pipe(
          map(products => products.filter(product =>
            product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
          ))
        )
      : this.products$;
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      console.log('El formulario es inválido. No se puede guardar el producto.');
      return;
    }

    const productData = { ...this.productForm.value }; // Clonar el formulario

    // Asignar el estado según la cantidad
    productData.status = this.getProductStatus(this.productForm.get('cantidad').value);

    const saveOperation = this.isEditing && this.currentProduct
      ? this.productService.updateProduct({ ...productData, id: this.currentProduct.id })
      : this.productService.addProduct(productData);

    saveOperation.subscribe(
      () => {
        const action = this.isEditing ? 'actualizado' : 'agregado';
        console.log(`Producto ${action}`);
        this.resetForm();
      },
      error => {
        console.error('Error al guardar producto:', error);
      }
    );
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
      error => console.error('Error al eliminar producto:', error)
    );
  }

  resetForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.productForm.reset();
  }

  updateProductStatus(cantidad: number): void {
    const statusControl = this.productForm.get('status');
    statusControl.setValue(this.getProductStatus(cantidad));
  }

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
        source: CameraSource.Photos,
      });

      this.productForm.patchValue({
        imagenUrl: image.webPath
      });
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }


  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Cambia a Camera para tomar una foto
      });
  
      // Verifica que la ruta de la imagen esté disponible
      console.log('Image URL:', image.webPath);
  
      // Actualiza la URL de la imagen en el formulario
      if (image.webPath) {
        this.productForm.patchValue({
          imagenUrl: image.webPath, // Guarda la ruta de la imagen tomada
        });
      } else {
        console.error('No se pudo obtener la ruta de la imagen.');
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  

}
