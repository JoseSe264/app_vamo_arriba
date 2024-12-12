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
      .list('lists')
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
      .list('products')
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
        this.db
          .list('users')
          .valueChanges()
          .pipe(
            catchError(err => {
              console.error('Error al obtener usuarios:', err);
              return of([]); // Retorna un arreglo vacío en caso de error
            })
          ),
        this.db
          .list('lists')
          .valueChanges()
          .pipe(
            catchError(err => {
              console.error('Error al obtener listas:', err);
              return of([]);
            })
          ),
        this.db
          .list('products')
          .valueChanges()
          .pipe(
            catchError(err => {
              console.error('Error al obtener productos:', err);
              return of([]);
            })
          ),
      ]).subscribe(
        ([users, lists, products]) => {
          console.log('Usuarios:', users);
          console.log('Listas:', lists);
          console.log('Productos:', products);

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
