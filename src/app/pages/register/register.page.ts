import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { profile } from "src/app/models/profile.model";

import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  RegisterForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,  // Inyección de FormBuilder
    private navCtrl: NavController,     // Inyección de NavController
    private authService: AuthService    // Inyección de AuthService

  ) { }
  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],}, { validator: this.passwordsMatch });
    }
  
 
  passwordsMatch(FormGroup : FormGroup){
    const { password,confirmPassword} = FormGroup.value;
    return password === confirmPassword? null : {notSame: true};
  }
  
  
  onRegister() {
    const profile = this.RegisterForm.value as profile;
    if (this.authService.register(profile)) {
      // Navegar al login después de crear el usuario
      alert('Usuario creado con éxito');
      this.navCtrl.navigateBack('/login');
    } else {
      alert('El usuario ya está registrado');
    }
  }
}
