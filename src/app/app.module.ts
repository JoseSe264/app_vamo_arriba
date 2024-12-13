import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Agrupado en una línea

import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './components/shared/shared.module';

import { AngularFireModule } from '@angular/fire/compat';  // Firebase compatibilidad
import { AngularFireAuthModule } from '@angular/fire/compat/auth';  // Módulo de autenticación de Firebase
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';  // Módulo de base de datos de Firebase
import { environment } from 'src/environments/environment';  // Asegúrate de tener la configuración en 'environment'
import { MatSnackBarModule } from '@angular/material/snack-bar';  // Módulo de Snackbar de Angular Material

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Inicializa Ionic
    AppRoutingModule,
    ReactiveFormsModule,  // Reactive forms
    SharedModule,  // Importa SharedModule para reutilizar componentes y servicios
    FormsModule,  // Formularios reactivos y template-driven
    RouterModule,  // Enrutamiento
    AngularFireModule.initializeApp(environment.firebaseConfig),  // Inicializa Firebase con la configuración
    AngularFireDatabaseModule,  // Firebase Database
    AngularFireAuthModule,  // Firebase Auth
    HttpClientModule,  // Módulo HTTP para realizar peticiones
    MatSnackBarModule,  // Angular Material Snackbar para mostrar notificaciones
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },  // Estrategia de reutilización de rutas
  ],
  bootstrap: [AppComponent]  // Componente raíz
})
export class AppModule {}
