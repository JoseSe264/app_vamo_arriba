import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private dbPath = '/listas';

  constructor(private db: AngularFireDatabase) {}

  // Crear una nueva lista
  createLista(lista: any): any {
    return this.db.list(this.dbPath).push(lista);
  }

  // Obtener todas las listas
  getListas(): Observable<any[]> {
    return this.db.list(this.dbPath).valueChanges();
  }

  // Eliminar una lista
  deleteLista(key: string): Promise<void> {
    return this.db.list(this.dbPath).remove(key);
  }

  // Actualizar una lista
  updateLista(key: string, value: any): Promise<void> {
    return this.db.list(this.dbPath).update(key, value);
  }
}
