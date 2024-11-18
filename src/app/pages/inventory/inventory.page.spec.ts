import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryPage } from './inventory.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment'; // Asegúrate de que este archivo tenga tu configuración de Firebase

describe('InventoryPage', () => {
  let component: InventoryPage;
  let fixture: ComponentFixture<InventoryPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con la configuración
        AngularFireDatabaseModule, // Importa el módulo de base de datos de Firebase
      ],
      declarations: [InventoryPage], // Declara el componente que estás probando
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se cree correctamente
  });
});
