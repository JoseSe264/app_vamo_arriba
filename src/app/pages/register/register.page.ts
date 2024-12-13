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
    // Inicializa el formulario con validaciones
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

  // Manejo del registro del usuario
  async onRegister() {
    if (this.registerForm.valid) {
      this.isSubmitting = true; // Desactiva el botón mientras se procesa
      const user = this.registerForm.value as User;

      try {
        // Verificar si el correo ya está registrado
        const emailMethods = await this.authService.checkEmailExists(user.email).toPromise();
        if (emailMethods.length > 0) {
          this.errorMessage = 'Este correo ya está registrado.';
          await this.showAlert('Error', this.errorMessage);
          this.isSubmitting = false;
          return;
        }

        // Intentar registrar al usuario
        const result = await this.authService.register(user);
        console.log('Registro exitoso', result);

        // Mostrar alerta de éxito
        const alert = await this.alertCtrl.create({
          header: 'Registro exitoso',
          message: 'Usuario registrado correctamente.',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.navCtrl.navigateForward('/login');
              },
            },
          ],
        });
        await alert.present();
      } catch (error) {
        console.error('Error al registrar:', error.message);
        this.errorMessage = 'No se pudo registrar el usuario. Intenta nuevamente.';
        await this.showAlert('Error', this.errorMessage);
      } finally {
        this.isSubmitting = false; // Reactiva el botón
      }
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      await this.showAlert('Error', this.errorMessage);
    }
  }

  // Navegar a la página de inicio de sesión
  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  // Función para mostrar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
