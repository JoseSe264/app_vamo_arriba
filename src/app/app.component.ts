import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    // Inicializar Firebase
    const app = initializeApp(environment.firebaseConfig);
    console.log('Firebase App Initialized:', app.name);
  }
}
