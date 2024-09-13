import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from '@ionic/angular';
import { Product } from 'src/app/models/product.model'; // Ajusta la ruta según sea necesario
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.page.html',
  styleUrls: ['./producto-edit.page.scss'],
})
export class ProductoEditPage implements OnInit {
  productForm: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      status: ['Disponible', Validators.required],
      imagenUrl: ['']
    });
  }

  ngOnInit() {
    this.productForm = this.fb.group({
      // Define los controles del formulario aquí
      nombre: [''],
      descripcion: [''],
      cantidad: [''],
      categoria: [''],
      precio: [''],
      status: ['']
    });
  }


  onSubmit() {
    if (this.productForm.valid) {
      // Aquí puedes enviar los datos al servidor o hacer alguna otra acción
      console.log('Producto guardado:', this.productForm.value);
      this.navCtrl.navigateBack('/inventario-casa/producto'); // Regresa a la lista de productos
    }
  }

  saveProduct() {
    if (this.productForm.valid) {
      // Guardar los datos del producto
      console.log('Producto guardado:', this.productForm.value);
      this.navCtrl.navigateBack('/inventario-casa/producto'); // Regresa a la lista de productos
    }
  }
}
