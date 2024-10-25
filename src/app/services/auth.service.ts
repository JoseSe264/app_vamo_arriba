import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  // Crear usuario en Firebase
  register(user: User): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        console.log('Usuario creado exitosamente', result);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Error al crear el usuario', error);
        throw error;
      });
  }

  // Iniciar sesión con Firebase
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('Inicio sesión exitosamente', result);
        this.router.navigate(['/index']);
      })
      .catch((error) => {
        console.log('Error al iniciar sesión', error);
        throw error;
      });
  }

  // Cerrar sesión
  logout(): Promise<any> {
    return this.afAuth.signOut()
      .then(() => {
        console.log('Sesión cerrada exitosamente');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Error al cerrar sesión', error);
        throw error;
      });
  }

  // Cambio de contraseña
  resetPassword(email: string): Promise<any> {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('Se envió un correo para restablecer la contraseña');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Error al enviar correo para restablecer contraseña', error); // Eliminado "envio Unknown word."
        throw error; // Lanzar el error para que pueda ser manejado en el componente
      });
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(authState => authState !== null)// Devuelve true si hay un usuario autenticado, false si no
    )
  }

  getCurrentUser(): Promise<any> {
    return this.afAuth.currentUser;
  }
}
