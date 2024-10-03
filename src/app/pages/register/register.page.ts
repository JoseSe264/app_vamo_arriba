import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from "src/app/services/auth.service";
import { User} from "src/app/models/user.models";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  registerForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,  // Inyección de FormBuilder
    private navCtrl: NavController,     // Inyección de NavController
    private authService: AuthService    // Inyección de AuthService

  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
      }, { validator: this.passwordsMatch });
    }
  
  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }


    async onRegister() {
      const user = this.registerForm.value as User;
      try {
        const result = await this.authService.register(user);
        console.log('Registro exitoso', result);
      } catch (error) {
        console.log('Error al registrar', error);
      }
    }
  
    goToLogin() {
      this.navCtrl.navigateForward('/login');
    }
  }