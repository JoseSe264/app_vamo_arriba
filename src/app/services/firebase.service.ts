import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  // Obtener todos los usuarios registrados desde Realtime Database
  getAllUsers(): Observable<any[]> {
    return this.db
      .list('users') // Ruta en Firebase
      .valueChanges()
      .pipe(
        catchError(err => {
          console.error('Error al obtener todos los usuarios:', err);
          return of([]); // Retorna un arreglo vacío si hay error
        })
      );
  }

  // Obtener el usuario autenticado
  getAuthenticatedUser(): Observable<any[]> {
    return new Observable(observer => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          observer.next([user]); // Solo usuario autenticado
        } else {
          observer.next([]); // Si no está autenticado
        }
      });
    });
  }

  // Obtener las listas de compra desde Realtime Database
  getLists(): Observable<any[]> {
    return this.db
      .list('listas') // Ruta de listas
      .valueChanges()
      .pipe(
        catchError(err => {
          console.error('Error al obtener listas:', err);
          return of([]); // Retornar vacío en caso de error
        })
      );
  }

  // Obtener los productos desde Realtime Database
  getProducts(): Observable<any[]> {
    return this.db
      .list('products') // Ruta de productos
      .valueChanges()
      .pipe(
        catchError(err => {
          console.error('Error al obtener productos:', err);
          return of([]); // Retornar vacío en caso de error
        })
      );
  }

  // Combinar datos para estadísticas
  getStats(): Observable<any> {
    return new Observable(observer => {
      combineLatest([
        this.getAllUsers(), // Cambiado para obtener todos los usuarios
        this.getLists(),
        this.getProducts(),
      ]).subscribe(
        ([users, lists, products]) => {
          observer.next({
            users: users.length,
            lists: lists.length,
            products: products.length,
          });
        },
        error => {
          console.error('Error en combineLatest:', error);
          observer.next({ users: 0, lists: 0, products: 0 });
        }
      );
    });
  }
}
