import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model'; 

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Input() productToEdit: Product | null = null; // Recibe el producto a editar desde el componente padre
  @Output() productAdded = new EventEmitter<Product>(); // Emite el producto agregado al componente padre
  @Output() productUpdated = new EventEmitter<Product>(); // Emite el producto actualizado al componente padre

  productForm: FormGroup; // Formulario reactivo para manejar los datos del producto
  selectedFile: File | null = null; // Variable para manejar el archivo seleccionado
  isDatePickerVisible = false; // Controla la visibilidad del selector de fecha

  isToastOpen = false; // Controla si el Toast está abierto o no
  toastMessage = ''; // Mensaje del Toast


  constructor(private fb: FormBuilder) {
    // Inicializa el formulario
    this.productForm = this.fb.group({
      id: [''], // ID generado automáticamente
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      categoria: [''],
      fechaExpiracion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      status: ['Disponible'], // Valor por defecto
      imagenUrl: [''], // Campo opcional para la URL de la imagen
    });
  }

  ngOnInit() {
    // Si hay un producto a editar, llenamos el formulario con sus datos
    if (this.productToEdit) {
      this.productForm.patchValue(this.productToEdit); // Llenar el formulario con los datos del producto a editar
    }
  }

  // Método para manejar la selección del archivo (imagen)
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0]; // Obtén el archivo seleccionado

      // Convertir la imagen a base64 para mostrarla o enviarla
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({ imagenUrl: reader.result as string }); // Guardar la imagen como base64 en el formulario
      };
      reader.readAsDataURL(this.selectedFile); // Lee el archivo como Data URL
    }
  }

  // Método para agregar o actualizar el producto
  addOrUpdateProduct() {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value; // Obtener los datos del formulario

      if (this.productToEdit) {
        // Emitir el producto actualizado al componente padre
        this.productUpdated.emit(productData);
        this.showToast('Producto actualizado con éxito en Firebase');
      } else {
        // Emitir el nuevo producto al componente padre
        this.productAdded.emit(productData);
        this.showToast('Producto añadido con éxito en Firebase');
      }

      // Restablecer el formulario después de agregar o actualizar el producto
      this.resetForm();
    } else {
      console.error('Formulario no válido');
    }
  }

  // Método para reiniciar el formulario
  resetForm() {
    this.productForm.reset({
      id: '',
      nombre: '',
      descripcion: '',
      cantidad: 0,
      categoria: '',
      fechaExpiracion: '',
      precio: 0,
      status: 'Disponible',
      imagenUrl: ''
    });
    this.selectedFile = null; // Reinicia el archivo seleccionado
  }

  // Método para verificar si el formulario es válido
  isFormValid(): boolean {
    return this.productForm.valid; // Verifica la validez del formulario reactivo
  }

  // Método para mostrar el selector de fecha
  showDatePicker() {
    this.isDatePickerVisible = true; // Muestra el selector de fecha
  }

  // Método para manejar la selección de la fecha
  onDateSelected(event: any) {
    this.productForm.controls['fechaExpiracion'].setValue(event.detail.value); // Establece la fecha seleccionada en el formulario
    this.isDatePickerVisible = false; // Oculta el selector de fecha después de seleccionar
  }

  // Método para mostrar el toast
  showToast(message: string) {
    this.toastMessage = message;
    this.isToastOpen = true;

    // Ocultar el toast después de 2 segundos
    setTimeout(() => {
      this.isToastOpen = false;
    }, 2000);
  }
}
