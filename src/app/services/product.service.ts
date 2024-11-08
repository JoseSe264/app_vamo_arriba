import { Injectable, Inject } from '@angular/core'; 
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { AngularFireStorage } from '@angular/fire/compat/storage'; 
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(
    @Inject(AngularFireDatabase) private db: AngularFireDatabase, 
    private storage: AngularFireStorage 
  ) {
    this.loadProducts(); // Cargar productos al iniciar el servicio
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
    return new Observable(observer => {
      if (product.imagenUrl) {
        this.uploadImage(product.imagenUrl).then(url => {
          product.imagenUrl = url; // Sube la imagen y obtiene la URL
          const newProductRef = this.db.list<Product>('products').push(product); 
          product.id = newProductRef.key || ''; 

          this.productsSubject.next([...this.productsSubject.getValue(), product]); // Actualiza la lista
          observer.next();
          observer.complete();
        }).catch(error => {
          console.error("Error al subir la imagen:", error);
          observer.error(error);
        });
      } else {
        const newProductRef = this.db.list<Product>('products').push(product); 
        product.id = newProductRef.key || ''; 

        this.productsSubject.next([...this.productsSubject.getValue(), product]); // Actualiza la lista
        observer.next();
        observer.complete();
      }
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
        console.error("Error Eliminar producto:", error);
        observer.error(error);
      });
    });
  }

  // Actualizar un producto existente
  updateProduct(updatedProduct: Product): Observable<void> {
    return new Observable(observer => {
      if (updatedProduct.imagenUrl) {
        this.uploadImage(updatedProduct.imagenUrl).then(url => {
          updatedProduct.imagenUrl = url; // Sube la imagen y obtiene la URL
          if (!updatedProduct.id) {
            console.error("Error: Product ID is undefined");
            observer.error("Product ID is undefined");
            return; 
          }

          this.db.list<Product>('products').update(updatedProduct.id, updatedProduct).then(() => {
            const products = this.productsSubject.getValue().map(product => 
              product.id === updatedProduct.id ? updatedProduct : product
            );
            this.productsSubject.next(products); // Actualiza el BehaviorSubject
            observer.next();
            observer.complete();
          }).catch(error => {
            console.error("Error updating product:", error);
            observer.error(error);
          });
        }).catch(error => {
          console.error("Error uploading image:", error);
          observer.error(error);
        });
      } else {
        if (!updatedProduct.id) {
          console.error("Error: Product ID is undefined");
          observer.error("Product ID is undefined");
          return; 
        }

        this.db.list<Product>('products').update(updatedProduct.id, updatedProduct).then(() => {
          const products = this.productsSubject.getValue().map(product => 
            product.id === updatedProduct.id ? updatedProduct : product
          );
          this.productsSubject.next(products); // Actualiza el BehaviorSubject
          observer.next();
          observer.complete();
        }).catch(error => {
          console.error("Error updating product:", error);
          observer.error(error);
        });
      }
    });
  }

  // Método para subir la imagen a Firebase Storage
  private async uploadImage(imageUrl: string): Promise<string> {
    try {
      const filePath = `images/${new Date().getTime()}_image`; // Nombre único para la imagen
      const fileRef = this.storage.ref(filePath);
      await fileRef.putString(imageUrl, 'data_url'); // Sube la imagen
      return await fileRef.getDownloadURL().toPromise(); // Obtiene la URL de descarga
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
}
