import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})

export class AppComponent {
  constructor() {
  const savedTheme = localStorage.getItem('darkMode');
  document.documentElement.classList.toggle('ion-palette-dark', savedTheme === 'true');
}
}