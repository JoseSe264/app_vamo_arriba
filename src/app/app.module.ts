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
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,  // Importar el módulo SharedModule para compartir componentes y servicios entre las páginas
    FormsModule,
    RouterModule,  // Importar el RouterModule para el enrutamiento
    AngularFireModule.initializeApp(environment.firebaseConfig),  // Inicializar Firebase con la configuración de environment
    AngularFireDatabaseModule,  // Módulo de base de datos de Firebase
    AngularFireAuthModule,  // Módulo de autenticación de Firebase
    HttpClientModule,  // Módulo para peticiones HTTP
    MatSnackBarModule,  // Importar el módulo de Snackbar de Angular Material
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
