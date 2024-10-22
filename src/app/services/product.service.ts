import { Injectable, Inject } from '@angular/core'; 
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
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
          const data = a.payload.val() as Product;
          const productId = a.payload.key;
          return { ...data, id: productId || '' }; 
        })
      ),
      catchError(error => {
        console.error("Error loading products:", error);
        return of([]); 
      })
    ).subscribe(products => {
      this.productsSubject.next(products);  
    });
  }

  // Agregar un nuevo producto
  addProduct(product: Product): Observable<void> {
    const newProductRef = this.db.list<Product>('products').push(product); 
    product.id = newProductRef.key || ''; 

    return new Observable(observer => {
      newProductRef
        .then(() => {
          this.productsSubject.next([...this.productsSubject.getValue(), product]);
          observer.next();
          observer.complete();
        })
        .catch(error => {
          console.error("Error adding product:", error);
          observer.error(error);
        });
    });
  }

  // Eliminar un producto por ID
  removeProduct(id: string): Observable<void> {
    return new Observable(observer => {
      this.db.list<Product>('products').remove(id).then(() => {
        const updatedProducts = this.productsSubject.getValue().filter(product => product.id !== id);
        this.productsSubject.next(updatedProducts);
        observer.next();
        observer.complete();
      }).catch(error => {
        console.error("Error removing product:", error);
        observer.error(error);
      });
    });
  }

  // Actualizar un producto existente
  updateProduct(updatedProduct: Product): Observable<void> {
    if (!updatedProduct.id) {
      console.error("Error: Product ID is undefined");
      return of(); 
    }

    return new Observable(observer => {
      this.db.list<Product>('products').update(updatedProduct.id, updatedProduct).then(() => {
        const products = this.productsSubject.getValue().map(product => 
          product.id === updatedProduct.id ? updatedProduct : product
        );
        this.productsSubject.next(products);
        observer.next();
        observer.complete();
      }).catch(error => {
        console.error("Error updating product:", error);
        observer.error(error);
      });
    });
  }
}
