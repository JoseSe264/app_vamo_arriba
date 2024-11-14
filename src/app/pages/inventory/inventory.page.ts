import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getStorage, ref, uploadString } from 'firebase/storage';

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
    // Inicializa el formulario con validaciones
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

    // Detecta cambios en la cantidad para actualizar el estado del producto
    this.productForm.get('cantidad').valueChanges.subscribe(cantidad => {
      this.updateProductStatus(cantidad);
    });
  }

  ngOnInit() {
    // Obtiene los productos desde el servicio
    this.products$ = this.productService.getProducts();
    this.filteredProducts$ = this.products$;
  }

  toggleForm(): void {
    // Alterna la visibilidad del formulario
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.isEditing = false;
      this.productForm.reset();
    }
  }

  onSearchTermChanged(searchTerm: string) {
    // Filtra los productos por nombre o descripción
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
    // Verifica si el formulario es válido antes de guardar
    if (this.productForm.invalid) {
      console.log('El formulario es inválido. No se puede guardar el producto.');
      return;
    }

    const productData = { ...this.productForm.value }; // Clona el formulario
    const saveOperation = this.isEditing && this.currentProduct
      ? this.productService.updateProduct({ ...productData, id: this.currentProduct.id })
      : this.productService.addProduct(productData);

    // Si estamos editando, verifica si hay una nueva imagen para subir
    const shouldUploadImage = this.isEditing && productData.imagenUrl && productData.imagenUrl !== this.currentProduct.imagenUrl;

    if (shouldUploadImage) {
      const storage = getStorage();
      const storageRef = ref(storage, `products/${Date.now()}.jpg`);

      // Sube la imagen en formato data_url
      uploadString(storageRef, productData.imagenUrl, 'data_url').then((snapshot) => {
        console.log('Imagen subida con éxito:', snapshot);
        // Continúa con la lógica de guardado del producto
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
      }).catch(error => {
        console.error('Error al subir la imagen:', error);
      });
    } else {
      // Si no hay imagen o no ha cambiado, guardar directamente
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
  }

  editProduct(product: Product): void {
    // Carga los datos del producto a editar en el formulario
    this.currentProduct = product;
    this.productForm.patchValue(product);
    this.isEditing = true;
    this.showForm = true;
  }

  removeProduct(id: string): void {
    // Elimina un producto
    this.productService.removeProduct(id).subscribe(
      () => {
        console.log('Producto eliminado correctamente');
      },
      error => console.error('Error al eliminar producto:', error)
    );
  }

  resetForm(): void {
    // Restablece el formulario
    this.showForm = false;
    this.isEditing = false;
    this.productForm.reset();
    this.currentProduct = null;
  }

  updateProductStatus(cantidad: number): void {
    // Actualiza el estado del producto según la cantidad
    const statusControl = this.productForm.get('status');
    statusControl.setValue(this.getProductStatus(cantidad));
  }

  getProductStatus(cantidad: number): string {
    // Devuelve el estado del producto según la cantidad
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
      // Permite seleccionar una imagen desde la galería
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
      // Permite tomar una foto con la cámara y subirla como base64
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });
  
      if (image && image.base64String) {
        const base64Data = `data:image/jpeg;base64,${image.base64String}`;
        this.productForm.patchValue({
          imagenUrl: base64Data,
        });
      } else {
        console.log('No se seleccionó ninguna imagen.');
      }
    } catch (error) {
      if (error.message.includes('User cancelled photos app')) {
        console.log('El usuario canceló la selección de la imagen.');
      } else {
        console.error('Error al tomar la foto:', error);
      }
    }
  }
}
