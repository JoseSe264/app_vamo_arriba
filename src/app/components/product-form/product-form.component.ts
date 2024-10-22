import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

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
      status: ['Disponible']
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
      this.productService.updateProduct(productData);
    } else {
      // Si es un nuevo producto, lo agrega
      this.productService.addProduct(productData);
    }
    this.productForm.reset(); // Resetea el formulario después de guardar
  }
}
