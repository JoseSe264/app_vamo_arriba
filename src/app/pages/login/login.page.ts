import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async logOn() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.valid) {
      try {
        await this.authService.login(email, password);
        // Navegar a la página de inicio después de iniciar sesión exitosamente
        this.navCtrl.navigateForward('/index');
      } catch (error) {
        console.error('Error al iniciar sesión', error);
        alert("Error en la autenticación. Verifique sus credenciales.");
      }
    } else {
      // Formulario no es válido
      alert("Verifique que el correo y la contraseña sean correctos.");
    }
  }

  navigateToRegister() {
    // Navega a la página de registro
    this.navCtrl.navigateForward('/register');
  }
}
