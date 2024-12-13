import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ProductFormComponent } from './product-form.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { of } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  // Configuración mock para Firebase
  const firebaseConfigMock = {
    apiKey: 'test-api-key',
    authDomain: 'test-auth-domain',
    databaseURL: 'https://test-database.firebaseio.com',
    projectId: 'test-project-id',
    storageBucket: 'test-storage-bucket',
    messagingSenderId: 'test-messaging-sender-id',
    appId: 'test-app-id',
  };

  // Mock del servicio AngularFireDatabase con snapshotChanges
  const angularFireDatabaseMock = {
    list: jasmine.createSpy('list').and.returnValue({
      snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of([])), // Simula snapshotChanges
    }),
    object: jasmine.createSpy('object').and.returnValue(of({})),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfigMock), // Inicialización de Firebase Mock
      ],
      providers: [
        { provide: AngularFireDatabase, useValue: angularFireDatabaseMock }, // Proveedor Mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Deberia Crear', () => {
    expect(component).toBeTruthy();
  });

  // Prueba para verificar llamada a snapshotChanges
  it('debería llamar a la lista AngularFireDatabase y a los métodos snapshotChanges', () => {
    component.saveProduct(); // Llama a un método que use AngularFireDatabase
    expect(angularFireDatabaseMock.list).toHaveBeenCalledWith('products'); // Ajusta la ruta según tu implementación
    expect(angularFireDatabaseMock.list().snapshotChanges).toHaveBeenCalled(); // Verifica que snapshotChanges sea llamado
  });
});
