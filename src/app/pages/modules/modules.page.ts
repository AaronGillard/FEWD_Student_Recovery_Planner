import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonChip,
    IonLabel,
  ],
})
export class ModulesPage {
  modules = [
    {
      name: 'Front-End Web Development',
      code: 'FEWD',
      lecturer: 'Module Lecturer',
      tasks: 3,
      colour: 'primary',
    },
    {
      name: 'Database Development',
      code: 'DBD',
      lecturer: 'Module Lecturer',
      tasks: 2,
      colour: 'success',
    },
    {
      name: 'Software Quality and Testing',
      code: 'SQT',
      lecturer: 'Module Lecturer',
      tasks: 1,
      colour: 'warning',
    },
  ];
}