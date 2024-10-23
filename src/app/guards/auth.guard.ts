import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario está autenticado, permitir el acceso (isLoggedIn() debería devolver true si está autenticado)
  if (authService.isLoggedIn()) {
    return true;
  } else {
    // Si no está autenticado, redirigir a la página de inicio de sesión
    router.navigate(['/login']);
    return false;
  }
};
