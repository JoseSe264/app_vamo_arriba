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

  // Obtener los usuarios desde Firebase Authentication
  getUsers(): Observable<any[]> {
    return new Observable(observer => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          console.log('Usuario autenticado:', user);
          observer.next([user]); // Solo el usuario autenticado
        } else {
          console.log('No hay usuario autenticado.');
          observer.next([]); // Retorna un arreglo vacío si no hay usuario autenticado
        }
      });
    });
  }

  // Obtener las listas desde Realtime Database
  getLists(): Observable<any[]> {
    return this.db
      .list('listas') // Asegúrate de usar la ruta correcta en Firebase
      .valueChanges()
      .pipe(
        catchError(err => {
          console.error('Error al obtener listas:', err);
          return of([]); // Retorna un arreglo vacío en caso de error
        })
      );
  }

  // Obtener los productos desde Realtime Database
  getProducts(): Observable<any[]> {
    return this.db
      .list('products') // Asegúrate de que esta ruta esté correcta
      .valueChanges()
      .pipe(
        catchError(err => {
          console.error('Error al obtener productos:', err);
          return of([]); // Retorna un arreglo vacío en caso de error
        })
      );
  }

  // Obtener estadísticas (usuarios, listas y productos)
  getStats(): Observable<any> {
    return new Observable(observer => {
      combineLatest([
        this.getUsers(),  // Cambiado para usar getUsers
        this.getLists(),
        this.getProducts(),
      ]).subscribe(
        ([users, lists, products]) => {
          console.log('Usuarios:', users); // Mensaje de depuración
          console.log('Listas:', lists);   // Mensaje de depuración
          console.log('Productos:', products); // Mensaje de depuración

          observer.next({
            users: users.length,
            lists: lists.length,
            products: products.length,
          });
        },
        error => {
          console.error('Error en combineLatest:', error);
          observer.next({ users: 0, lists: 0, products: 0 }); // Valores por defecto
        }
      );
    });
  }
}
