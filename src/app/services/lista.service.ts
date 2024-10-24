import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private dbPath = '/listas';

  constructor(private db: AngularFireDatabase) {}

  createLista(lista: lista): any {
    return this.db.list(this.dbPath).set(lista.id!, lista);
  }

  getListas(): Observable<lista[]> {
    return this.db.list<lista>(this.dbPath).valueChanges();
  }

  deleteLista(id: string): Promise<void> {
    return this.db.list(this.dbPath).remove(id);
  }

  updateLista(id: string, value: lista): Promise<void> {
    return this.db.list(this.dbPath).update(id, value);
  }
}
