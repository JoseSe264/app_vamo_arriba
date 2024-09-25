import { Injectable } from '@angular/core';
import { profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: profile[] = []; // Almacenará los usuarios registrados

  constructor() { }

  // Método para registrar un nuevo usuario
  register(profile: profile): boolean {
    // Verifica si el usuario ya está registrado
    const userExists = this.users.some(user => user.email === profile.email); 
    if (userExists) {
      return false; // Retorna false si el usuario ya está registrado
    }

    this.users.push(profile); // Agrega el nuevo perfil al array
    return true; // Retorna true si el registro fue exitoso
  }
}
