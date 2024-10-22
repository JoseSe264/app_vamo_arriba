import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
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
    private router: Router,
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
      this.authService.login(email, password)
        .then(() => {
          // Navegar a la página de inicio después de iniciar sesión
          this.navCtrl.navigateForward('/home');
        })
        .catch((error) => {
          console.log('Error al iniciar sesión', error);
        });

      // Aquí puedes añadir NavigationExtras si necesitas pasar datos adicionales
      const navigationExtras: NavigationExtras = {
        queryParams: { email }
      };
      this.router.navigate(['index'], navigationExtras);

    } else {
      console.error('Formulario inválido');
    }
  }

  navigateToRegister() {
    // Navega a la página de registro
    this.navCtrl.navigateForward('/register'); 
  }
}