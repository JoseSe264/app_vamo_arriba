import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  email!: string;
  password!: string;
  usuario!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.router.getCurrentNavigation()?.extras.state){
      const datos = this.router.getCurrentNavigation()?.extras.state;
      this.email = datos?.['email'];
      this.password = datos?.['password'];
      this.usuario = datos?.['usuario'];
    }
  }

  ngOnInit() {
  }
  
   // Método para cerrar sesión
   cerrarSesion() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);  // Redirige al login después de cerrar sesión
    }).catch(error => {
      console.log('Error al cerrar sesión:', error);
    });
  }

   // Funciones de navegación
   navigateToInventarioCasa() {
    this.router.navigate(['/inventory']);  // Navega a la página de Categoría
  }

  imageArray: string[] = [
    'assets/img_Inv/detergente.jpg',
    'assets/img_Inv/cerveza.jpg',
    'assets/img_Inv/aceite.jpg',
  ];
  

}
