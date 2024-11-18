import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CerrarSesionComponent } from './cerrar-sesion.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('CerrarSesionComponent', () => {
  let component: CerrarSesionComponent;
  let fixture: ComponentFixture<CerrarSesionComponent>;

  // Configuración mock para Firebase
  const firebaseConfigMock = {
    apiKey: 'test-api-key',
    authDomain: 'test-auth-domain',
    projectId: 'test-project-id',
    storageBucket: 'test-storage-bucket',
    messagingSenderId: 'test-messaging-sender-id',
    appId: 'test-app-id',
  };

  // Mock del servicio AngularFireAuth
  const angularFireAuthMock = {
    authState: of(null), // Simula que no hay usuario autenticado
    signOut: jasmine.createSpy('signOut'), // Mockea el método signOut
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CerrarSesionComponent],
      imports: [
        IonicModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfigMock), // Inicialización de Firebase con el mock
      ],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthMock }, // Proveedor del servicio mockeado
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CerrarSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('deberia crear', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a signOut al cerrar sesión', () => {
    component.cerrarSesion(); // Asegúrate de que el método cerrarSesion exista en tu componente
    expect(angularFireAuthMock.signOut).toHaveBeenCalled();
  });
});
