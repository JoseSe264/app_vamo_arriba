import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.scss'],
})
export class CerrarSesionComponent  implements OnInit {

  constructor(private authService:AuthService,private router:Router) {}

  ngOnInit() {}


  cerrarSesion() {
    this.authService.logout().then(() => {
      console.log('Sesión cerrada'); 
      this.router.navigate(['/login']);

    }).catch((error) => {

      console.error('Error al cerrar sesión', error);


    });
  }

}
