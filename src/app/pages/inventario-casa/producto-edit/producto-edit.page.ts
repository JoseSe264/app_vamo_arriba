import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.page.html',
  styleUrls: ['./producto-edit.page.scss'],
})
export class ProductoEditPage implements OnInit {
  productForm: FormGroup;
  isAccordionOpen: { [key: string]: boolean } = {};  
  imageUrl: string | null = null; // Variable para la URL de la imagen

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private router: Router
  ) {
    // Inicializa el formulario con las validaciones
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      status: ['Disponible', Validators.required],
      imagenUrl: ['', [Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i)]]
    });
  }

  ngOnInit() {
    // Puedes cargar los datos del producto aquí si es necesario
  }

  toggleAccordion(section: string) {
    // Cierra todos los acordeones y abre el seleccionado
    this.isAccordionOpen = {
      verProducto: false,
      editarProducto: false,
      agregarProducto: false,
      borrarProductos: false
    };
    this.isAccordionOpen[section] = !this.isAccordionOpen[section];
  }


  onSubmit() {
    if (this.productForm.valid) {
      // Aquí puedes enviar los datos al servidor o hacer alguna otra acción
      console.log('Producto guardado:', this.productForm.value);
      this.navCtrl.navigateBack('/inventario-casa/producto'); // Regresa a la lista de productos
    } else {
      console.log('Formulario inválido');
    }


  }

  

  saveProduct() {
    if (this.productForm.valid) {
      // Guardar los datos del producto
      console.log('Producto guardado:', this.productForm.value);
      this.navCtrl.navigateBack('/inventario-casa/producto'); // Regresa a la lista de productos
    }
  }

  deleteProduct() {
    // Implementar la lógica para borrar el producto aquí
    console.log('Producto borrado');
    this.navCtrl.navigateBack('/inventario-casa/producto'); // Regresa a la lista de productos
  }
}
