import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

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
    private router: Router
  ) {
    // Inicialización del formulario reactivo
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async logOn() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      const usuario = email.split('@')[0];

      const navigationExtras: NavigationExtras = {
        state: {
          usuario: usuario,
          email: email,
          password: password
        }
      };

      // Navegar a la siguiente página con los datos del usuario
      this.router.navigate(['index'], navigationExtras);
    } else {
      // Manejar caso donde el formulario no es válido
      console.error('Formulario inválido');
    }
  }

  navigateToregister() {
    // Navega a la página de registro
    this.navCtrl.navigateForward('/register'); 
  }
}
