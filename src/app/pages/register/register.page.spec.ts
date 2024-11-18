import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment'; // Asegúrate de importar la configuración de Firebase

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con la configuración
        AngularFireAuthModule // Importa el módulo de autenticación
      ],
      declarations: [RegisterPage]
    });

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia Crearse', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se cree correctamente
  });

  it('Debería inicializar el formulario de registro correctamente', () => {
    // Asumiendo que RegisterPage tiene una propiedad "registerForm"
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.controls['email']).toBeDefined();
    expect(component.registerForm.controls['password']).toBeDefined();
  });
});
