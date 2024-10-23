import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Agrupado en una línea

import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; 

import { AngularFireModule } from '@angular/fire/compat'; // Firebase compatibilidad
import { AngularFireAuthModule } from '@angular/fire/compat/auth';  // Módulo de autenticación de Firebase
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // Módulo de base de datos de Firebase
import { environment } from 'src/environments/environment';  // Asegúrate de tener la configuración en 'environment'


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,

    FormsModule,
    RouterModule,  // Importar el RouterModule para el enrutamiento
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
    AngularFireDatabaseModule,  // Módulo de base de datos
    AngularFireAuthModule, // Módulo de autenticación
    HttpClientModule // Módulo para peticiones HTTP
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
