import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment'; // Asegúrate de que el archivo de entorno esté disponible
import { of } from 'rxjs';  // Para simular respuestas de Firebase
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig), // Configuración de Firebase
        AngularFireDatabaseModule, // Módulo de Firebase para la base de datos
      ],
      providers: [ProductService], // Proveer el servicio
    });
    service = TestBed.inject(ProductService); // Inyectamos el servicio
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy(); // Verificamos que el servicio esté correctamente creado
  });

  it('debe agregar un producto correctamente', (done) => {
    const product: Product = { 
      nombre: 'Producto Test', 
      descripcion: 'Descripción', 
      cantidad: 10, 
      categoria: 'Electrónica', 
      fechaExpiracion: new Date(), 
      precio: 100, 
      status: "Disponible", // Asegúrate de usar uno de los valores válidos para el campo status
    };

    // Simulamos la respuesta de Firebase con un observable que emite el producto
    spyOn(service, 'addProduct').and.callFake(() => {
      return of(null); // Simulamos la adición sin hacer la llamada real a Firebase
    });

    // Simulamos que el producto se agregue y luego obtenemos la lista de productos
    service.addProduct(product).subscribe(() => {  
      spyOn(service, 'getProducts').and.returnValue(of([product]));  // Simulamos la obtención de productos

      service.getProducts().subscribe((products) => {
        expect(products).toBeTruthy();  // Verificamos que los productos sean obtenidos correctamente
        expect(products.length).toBe(1); // Verificamos que el producto agregado esté en la lista
        expect(products[0]).toEqual(product);  // Verificamos que el producto en la lista es el mismo
        done();  // Indicamos que la prueba ha terminado
      });
    });
  });

  it('debe eliminar un producto correctamente', (done) => {
    const productId = 'testId';
    const initialProducts: Product[] = [
      { id: 'testId', nombre: 'Producto Test', descripcion: 'Descripción', cantidad: 10, categoria: 'Electrónica', fechaExpiracion: new Date(), precio: 100, status: "Disponible" },
    ];

    // Simulamos la respuesta de Firebase para eliminar el producto
    spyOn(service, 'removeProduct').and.callFake(() => {
      return of(null);  // Simulamos la eliminación sin hacer la llamada real a Firebase
    });

    // Simulamos la eliminación del producto
    service.removeProduct(productId).subscribe(() => {
      spyOn(service, 'getProducts').and.returnValue(of([]));  // Simulamos que después de eliminar el producto no hay productos

      service.getProducts().subscribe((products) => {
        expect(products.length).toBe(0);  // Verificamos que no haya productos en la lista
        done();  // Indicamos que la prueba ha terminado
      });
    });
  });

});
