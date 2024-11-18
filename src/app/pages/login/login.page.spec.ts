import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment'; // Asegúrate de que este archivo tenga tu configuración de Firebase
import { initializeApp, getApp, getApps } from 'firebase/app'; // Importación de Firebase para evitar el error
import { IonicModule } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    // Verifica si Firebase ya está inicializado antes de intentar inicializarlo de nuevo
    if (getApps().length === 0) { // Verifica si ya hay apps inicializadas
      initializeApp(environment.firebaseConfig); // Inicializa Firebase solo si no está inicializado
    }

    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Configura Firebase en las pruebas
        AngularFireAuthModule, // Asegúrate de importar AngularFireAuthModule para la autenticación
        ReactiveFormsModule, // Importa ReactiveFormsModule para formularios reactivos
        IonicModule.forRoot(), //
      ],
      declarations: [LoginPage], // Declara el componente que estás probando
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se cree correctamente
  });
});
