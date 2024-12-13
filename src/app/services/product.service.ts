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
    // Verifica si la URL de la imagen es en formato base64
    const isBase64 = imageUrl.startsWith('data:'); // Verifica si la URL de la imagen es base64
    
    if (isBase64) {
      // Si es base64, crea una referencia única para la imagen en Firebase Storage
      const filePath = `images/${new Date().getTime()}_image`; // Nombre único para la imagen
      const fileRef = this.storage.ref(filePath);
      
      // Subir la imagen en formato base64
      await fileRef.putString(imageUrl, 'data_url'); // Sube la imagen en formato base64
      
      // Obtiene la URL de descarga de Firebase Storage
      const downloadUrl = await fileRef.getDownloadURL().toPromise();
      console.log('Imagen subida correctamente. URL:', downloadUrl);
      return downloadUrl; // Devuelve la URL para acceder a la imagen
    } else if (imageUrl.startsWith('blob:')) {
      // Si la URL es un blob, convertimos a un objeto File
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `image_${new Date().getTime()}.jpg`, { type: blob.type });

      // Crea una referencia para el archivo en Firebase Storage
      const filePath = `images/${new Date().getTime()}_image.jpg`; // Ruta única para la imagen
      const fileRef = this.storage.ref(filePath);

      // Subir la imagen (ahora como archivo) a Firebase Storage
      await fileRef.put(file);
      
      // Obtener la URL de descarga de Firebase Storage
      const downloadUrl = await fileRef.getDownloadURL().toPromise();
      console.log('Imagen subida correctamente. URL:', downloadUrl);
      return downloadUrl;
    } else {
      // Si no es base64 ni blob, simplemente devuelve la URL tal cual (se asume que es una URL válida)
      console.log('URL de imagen ya proporcionada:', imageUrl);
      return imageUrl;
    }
  } catch (error) {
    // En caso de error, muestra el error en consola
    console.error("Error uploading image:", error);
    throw error;
  }
}



}  