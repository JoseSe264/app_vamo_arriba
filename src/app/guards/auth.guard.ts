import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado con el observable
  return authService.getCurrentUser().then(currentUser => {
    // Si el usuario está autenticado, permite el acceso
    if (currentUser) {
      console.log('Usuario autenticado:', currentUser);  // Muestra el usuario real
      return true;
    } else {
      console.log('Usuario no autenticado. Redirigiendo...');
      router.navigate(['/login']);  // Redirige a la página de login si no está autenticado
      return false;
    }
  }).catch(error => {
    // Maneja cualquier error (por ejemplo, si getCurrentUser() falla)
    console.error('Error en la autenticación', error);
    router.navigate(['/login']);
    return false;
  });
};
