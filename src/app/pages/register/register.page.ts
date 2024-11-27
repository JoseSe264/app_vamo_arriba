import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user.models";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  isSubmitting = false; // Para manejar el estado de envío
  errorMessage = ''; // Mensaje de error

  constructor(
    private fb: FormBuilder, // Inyección de FormBuilder
    private navCtrl: NavController, // Inyección de NavController
    private authService: AuthService, // Inyección de AuthService
    private alertCtrl: AlertController // Inyección de AlertController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [this.passwordsMatch], // Validador de contraseñas
      }
    );
  }

  // Validador personalizado para confirmar contraseñas
  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  async onRegister() {
    if (this.registerForm.valid) {
      this.isSubmitting = true; // Desactiva el botón mientras se procesa
      const user = this.registerForm.value as User;
      try {
        const result = await this.authService.register(user);
        console.log('Registro exitoso', result);

        // Muestra alerta de éxito
        const alert = await this.alertCtrl.create({
          header: 'Registro exitoso',
          message: 'Usuario registrado correctamente.',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                // Navega a la página de login después de cerrar la alerta
                this.navCtrl.navigateForward('/login');
              },
            },
          ],
        });

        await alert.present();
      } catch (error) {
        console.error('Error al registrar:', error.message);
        this.errorMessage = 'No se pudo registrar el usuario. Intenta nuevamente.';
      } finally {
        this.isSubmitting = false; // Reactiva el botón
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}
