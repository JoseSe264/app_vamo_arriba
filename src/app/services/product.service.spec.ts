import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment'; // Asegúrate de que el archivo de entorno esté disponible

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Proporciona la configuración de Firebase
        AngularFireDatabaseModule, // Asegúrate de importar el módulo de base de datos
      ],
      providers: [ProductService], // Asegúrate de proveer el servicio
    });
    service = TestBed.inject(ProductService);
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });
});
