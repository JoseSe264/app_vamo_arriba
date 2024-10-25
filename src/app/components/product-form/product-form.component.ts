import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() product?: Product; // Si estás editando un producto, usa Input
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      cantidad: [0],
      categoria: [''],
      fechaExpiracion: [''],
      precio: [0],
      status: ['Disponible'],
      imagenUrl: [''],
    });
  }

  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue(this.product); // Si estás editando, carga los valores
    }
  }

  saveProduct() {
    const productData: Product = this.productForm.value; // Captura los datos del formulario
    if (this.product) {
      // Si hay un producto, lo actualiza
      productData.id = this.product.id; // Asegúrate de que el ID esté presente
      this.productService.updateProduct(productData).subscribe({
        next: () => {
          console.log('Producto actualizado con éxito');
          this.productForm.reset(); // Resetea el formulario después de guardar
        },
        error: (err) => {
          console.error('Error al actualizar el producto:', err);
        },
      });
    } else {
      // Si es un nuevo producto, lo agrega
      this.productService.addProduct(productData).subscribe({
        next: () => {
          console.log('Producto agregado con éxito');
          this.productForm.reset(); // Resetea el formulario después de guardar
        },
        error: (err) => {
          console.error('Error al agregar el producto:', err);
        },
      });
    }
  }

  // Método para seleccionar una imagen usando la cámara o la galería
  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // Puedes cambiar a CameraSource.Camera para tomar una foto
      });

      // Actualiza la URL de la imagen en el formulario
      this.productForm.patchValue({
        imagenUrl: image.webPath, // Guarda la ruta de la imagen seleccionada
      });
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }
}
