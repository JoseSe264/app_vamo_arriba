import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';  // Asegúrate de que esta importación esté correcta

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),  // Proporciona la configuración de Firebase
        AngularFireAuthModule  // Habilita el módulo de autenticación de Firebase
      ],
      providers: [AuthService]  // Proporciona el servicio AuthService
    });
    service = TestBed.inject(AuthService);  // Inyecta el servicio AuthService
  });

  it('Deberia Crearse', () => {
    expect(service).toBeTruthy();  // Verifica que el servicio se haya creado correctamente
  });
});
