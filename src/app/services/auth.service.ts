import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private handleError(error: any, defaultMessage: string): void {
    console.error(error);
    this.snackBar.open(defaultMessage, 'Cerrar', {
      duration: 3000, // 3 segundos
    });
    throw new Error(defaultMessage);
  }

  // Verificar si el correo ya está registrado (retorna un Observable)
  checkEmailExists(email: string): Observable<any> {
    return from(this.afAuth.fetchSignInMethodsForEmail(email)); // Convertir el Promise a un Observable
  }

  // Registrar un nuevo usuario
  async register(user: { email: string; password: string }): Promise<void> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      console.log('Usuario creado exitosamente', result);
      this.router.navigate(['/home']);
    } catch (error) {
      this.handleError(error, 'No se pudo crear el usuario. Intenta nuevamente.');
    }
  }

  // Iniciar sesión con un usuario
  async login(email: string, password: string): Promise<void> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Inicio de sesión exitoso', result);
      this.router.navigate(['/home']);
    } catch (error) {
      this.handleError(error, 'Credenciales inválidas. Verifica tus datos.');
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Sesión cerrada exitosamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
      this.snackBar.open('Problema al cerrar sesión. Intenta de nuevo.', 'Cerrar', { duration: 3000 });
    }
  }

  // Restablecer la contraseña
  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo enviado para restablecer la contraseña');
      this.snackBar.open('Correo enviado para restablecer la contraseña', 'Cerrar', { duration: 3000 });
    } catch (error) {
      this.handleError(error, 'No se pudo enviar el correo. Verifica el email.');
    }
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((user) => !!user)); // True si el usuario está autenticado
  }

  // Obtener el usuario actual
  async getCurrentUser(): Promise<any> {
    const user = await this.afAuth.currentUser;
    if (!user) {
      throw new Error('No hay usuario autenticado');
    }
    return user;
  }
}
