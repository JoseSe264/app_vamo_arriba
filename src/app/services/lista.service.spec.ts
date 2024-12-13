import { TestBed } from '@angular/core/testing';
import { ListaService } from './lista.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { of } from 'rxjs'; // Para simular observables

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

  it('crear nueva  lista', (done) => {
    const lista = { id: '1', nombrelista: 'Lista de Compras', nombreproducto: 'Manzanas' };

    spyOn(service, 'createLista').and.callFake((lista) => {
      return of(null); // Simula una respuesta exitosa
    });

    service.createLista(lista).subscribe(() => {
      expect(service.createLista).toHaveBeenCalledWith(lista); // Verifica que el servicio fue llamado con el objeto correcto
      done(); // Finaliza la prueba asincrónica
    });
  });

  it('recuperar la lista de listas', (done) => {
    const listasMock = [
      { id: '1', nombrelista: 'Lista de Compras', nombreproducto: 'Manzanas' },
      { id: '2', nombrelista: 'Lista de Tareas', nombreproducto: 'Estudiar' }
    ];

    spyOn(service, 'getListas').and.returnValue(of(listasMock)); // Simula la respuesta de obtener las listas

    service.getListas().subscribe((listas) => {
      expect(listas.length).toBe(2); // Verifica que se devuelven dos listas
      expect(listas).toEqual(listasMock); // Verifica que las listas devueltas son las mismas que las simuladas
      done(); // Finaliza la prueba asincrónica
    });
  });

  it('eliminar una lista', (done) => {
    const id = '1';

    spyOn(service, 'deleteLista').and.callFake((id) => {
      return Promise.resolve(); // Simula la eliminación sin hacer la llamada real a Firebase
    });

    service.deleteLista(id).then(() => {
      expect(service.deleteLista).toHaveBeenCalledWith(id); // Verifica que el método deleteLista fue llamado con el id correcto
      done(); // Finaliza la prueba asincrónica
    });
  });

  it('Actualizar una lista', (done) => {
    const id = '1';
    const updatedLista = { id: '1', nombrelista: 'Lista de Compras Actualizada', nombreproducto: 'Pera' };

    spyOn(service, 'updateLista').and.callFake((id, value) => {
      return Promise.resolve(); // Simula la actualización sin hacer la llamada real a Firebase
    });

    service.updateLista(id, updatedLista).then(() => {
      expect(service.updateLista).toHaveBeenCalledWith(id, updatedLista); // Verifica que el método updateLista fue llamado con los parámetros correctos
      done(); // Finaliza la prueba asincrónica
    });
  });
});




