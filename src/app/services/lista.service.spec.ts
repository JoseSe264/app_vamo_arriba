import { TestBed } from '@angular/core/testing';
import { ListaService } from './lista.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

describe('ListaService', () => {
  let service: ListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con la configuración de environment
        AngularFireDatabaseModule, // Importa el módulo de Firebase Database
      ],
      providers: [ListaService], // Proporciona el servicio ListaService en lugar de declararlo
    }).compileComponents();

    service = TestBed.inject(ListaService); // Inyecta el servicio ListaService en la prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se haya creado correctamente
  });
});
