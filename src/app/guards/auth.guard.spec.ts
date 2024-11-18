import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('authGuard', () => {
  let mockAuthService: any;
  let mockRouter: any;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockAuthService = {
      getCurrentUser: jasmine.createSpy('getCurrentUser'),
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('debería permitir el acceso si el usuario está autenticado', async () => {
    mockAuthService.getCurrentUser.and.returnValue(Promise.resolve({ uid: '12345' })); // Simula un usuario autenticado
    const result = await executeGuard(null as any, null as any); // Ejecuta el guard
    expect(result).toBeTrue(); // Verifica que el acceso fue permitido
  });

  it('debería redirigir al login si el usuario no está autenticado', async () => {
    mockAuthService.getCurrentUser.and.returnValue(Promise.resolve(null)); // Simula que no hay usuario autenticado
    const result = await executeGuard(null as any, null as any); // Ejecuta el guard
    expect(result).toBeFalse(); // Verifica que el acceso fue denegado
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']); // Verifica la redirección
  });
});
