import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment'; // Asegúrate de importar la configuración de Firebase

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase
        AngularFireAuthModule // Importa el módulo de autenticación de Firebase
      ],
      providers: [AuthService] // Provee el servicio AuthService
    });
    service = TestBed.inject(AuthService);
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio sea creado
  });
});
