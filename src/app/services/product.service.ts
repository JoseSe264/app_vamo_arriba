import { Injectable, Inject } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Asegúrate de que esto es correcto
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(@Inject(AngularFireDatabase) private db: AngularFireDatabase) {
    this.loadProducts();  // Cargar productos al iniciar el servicio
  }

  // Obtener todos los productos como Observable
  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  // Cargar productos desde Firebase
  private loadProducts(): void {
    this.db.list<Product>('products').snapshotChanges().pipe(
      map(actions => 
        actions.map(a => {
          const data = a.payload.val() as Product; // Toma el producto como un tipo Product
          const productId = a.payload.key; // Guarda la referencia del ID del producto
          return { ...data, id: productId || '' }; // Asigna productId sin sobrescribir el id de data
        })
      ),
      catchError(error => {
        console.error("Error loading products:", error);
        return of([]); // Retorna un array vacío en caso de error
      })
    ).subscribe(products => {
      this.productsSubject.next(products);  // Actualiza la lista de productos
    });
  }

  // Agregar un nuevo producto
addProduct(product: Product): void {
  const newProductRef = this.db.list<Product>('products').push(product); // Pasa el producto como argumento
  product.id = newProductRef.key || ''; // Asignar un valor por defecto si key es null
  
  newProductRef
    .then(() => {
      this.productsSubject.next([...this.productsSubject.getValue(), product]); // Agrega el nuevo producto a la lista
    })
    .catch(error => {
      console.error("Error adding product:", error);
    });
}


  // Eliminar un producto por ID
  removeProduct(id: string): void {
    this.db.list<Product>('products').remove(id).then(() => {
      const updatedProducts = this.productsSubject.getValue().filter(product => product.id !== id); // Filtra los productos
      this.productsSubject.next(updatedProducts); // Actualiza la lista de productos
    }).catch(error => {
      console.error("Error removing product:", error);
    });
  }

  // Actualizar un producto existente
  updateProduct(updatedProduct: Product): void {
    if (!updatedProduct.id) {
      console.error("Error: Product ID is undefined");
      return; // Detiene la ejecución si el ID es undefined
    }

    this.db.list<Product>('products').update(updatedProduct.id, updatedProduct).then(() => {
      const products = this.productsSubject.getValue().map(product => 
        product.id === updatedProduct.id ? updatedProduct : product // Reemplaza el producto actualizado
      );
      this.productsSubject.next(products); // Actualiza la lista de productos
    }).catch(error => {
      console.error("Error updating product:", error);
    });
  }
}
