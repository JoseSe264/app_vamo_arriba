import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

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

  async saveProduct(): Promise<void> {
    if (this.productForm.invalid) {
      console.log('El formulario es inválido. No se puede guardar el producto.');
      return;
    }

    const productData = { ...this.productForm.value };

    // Subir la imagen si existe y está en formato base64
    if (productData.imagenUrl && productData.imagenUrl.startsWith('data:')) {
      try {
        const imageUrl = await this.uploadImageToFirebase(productData.imagenUrl);
        productData.imagenUrl = imageUrl; // Actualiza la URL con la de Firebase Storage
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        return;
      }
    }

    const saveOperation = this.isEditing && this.currentProduct
      ? this.productService.updateProduct({ ...productData, id: this.currentProduct.id })
      : this.productService.addProduct(productData);

    saveOperation.subscribe(
      () => {
        const action = this.isEditing ? 'actualizado' : 'agregado';
        console.log(`Producto ${action}`);
        this.resetForm();
      },
      (error) => {
        console.error('Error al guardar producto:', error);
      }
    );
  }

  private async uploadImageToFirebase(base64Image: string): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, `products/${Date.now()}.jpg`);

    console.log('Subiendo imagen:', base64Image);

    try {
      const snapshot = await uploadString(storageRef, base64Image, 'data_url');
      console.log('Imagen subida con éxito:', snapshot);
      return await getDownloadURL(snapshot.ref); // Obtiene la URL de descarga
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
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
    this.currentProduct = null;
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

      if (image && image.webPath) {
        const response = await fetch(image.webPath);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result as string;
          this.productForm.patchValue({
            imagenUrl: base64Data,
          });
        };
        reader.readAsDataURL(blob);
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  async takePhoto() {
    try {
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
