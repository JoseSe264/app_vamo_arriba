import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  private handleError(error: any, defaultMessage: string): never {
    console.error(error);
    throw new Error(defaultMessage);
  }

  async register(user: { email: string; password: string }): Promise<void> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      console.log('Usuario creado exitosamente', result);
    } catch (error) {
      this.handleError(error, 'No se pudo crear el usuario. Por favor, intenta nuevamente.');
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Inicio de sesión exitoso', result);
    } catch (error) {
      this.handleError(error, 'Credenciales inválidas. Por favor, verifica tus datos.');
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      throw new Error('Hubo un problema al cerrar la sesión. Intenta de nuevo.');
    }
  }
  

  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo enviado para restablecer la contraseña');
    } catch (error) {
      this.handleError(error, 'No se pudo enviar el correo. Verifica el email proporcionado.');
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => !!user) // Retorna true si hay usuario, false si no
    );
  }

  async getCurrentUser(): Promise<any> {
    return this.afAuth.currentUser;
  }
}
