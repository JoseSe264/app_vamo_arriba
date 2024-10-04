import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup; // Declarar la propiedad profileForm

  constructor(private formBuilder: FormBuilder) {
    // Inicializar el formulario reactivo
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required], // Campo para el nombre
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]], // Campo para el email, deshabilitado
      profileImage: [''], // Campo para la URL de la imagen de perfil
      password: ['', Validators.required] // Campo de contraseña (requerido)
      //quiero un formulario para este user
    });
  }

  ngOnInit() {
    // Aquí puedes cargar los datos del perfil si es necesario
    // Por ejemplo, puedes llenar el formulario con datos existentes
  }

  updateProfile() {
    if (this.profileForm.valid) {
      // Lógica para actualizar el perfil
      console.log('Perfil actualizado:', this.profileForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  logout() {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión');
  }
}
