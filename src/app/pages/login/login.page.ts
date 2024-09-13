import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router
  ) {
      this.loginForm = this.formBuilder.group({
        email: ['',Validators.required],
        password: ['',Validators.required]
      })
  }

  ngOnInit() {
  }

  async logOn(){
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

    this.router.navigate(['index'], navigationExtras);
  }

}
