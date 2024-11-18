import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  
  // Configuración previa a las pruebas
  let fixture;
  let app;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],  // Declaración de los componentes que se usarán en el test
      schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Usamos el esquema para elementos personalizados
    }).compileComponents();  // Compila los componentes en el TestBed
  });

  // Inicializa la prueba básica para verificar que el componente se crea correctamente
  it('debería crear el componente AppComponent', () => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;  // Accedemos a la instancia del componente
    expect(app).toBeTruthy();  // Verifica que el componente sea creado
  });

});
