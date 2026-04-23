import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Device } from '@capacitor/device';
import { AppStorageService } from 'src/app/services/storage';
import { AlertController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonToggle,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonToggle,
    IonItem,
    IonLabel,
    FormsModule,
    RouterLink,
  ],
})
export class SettingsPage implements OnInit {
  appName = 'Student Recovery Planner';
  isDarkMode = false;

  platform = '';
  operatingSystem = '';
  osVersion = '';
  model = '';

  constructor(private appStorageService: AppStorageService, private alertController: AlertController, private toastController: ToastController) {}
  
  async ngOnInit() {
  const info = await Device.getInfo();

  this.platform = info.platform;
  this.operatingSystem = info.operatingSystem;
  this.osVersion = info.osVersion;
  this.model = info.model;

  const savedTheme = localStorage.getItem('darkMode');
  this.isDarkMode = savedTheme === 'true';
  document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
}

async clearSavedData() {
  const alert = await this.alertController.create({
    header: 'Clear Saved Data?',
    message: 'This will remove all saved planner tasks and modules from this device.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Clear',
        role: 'destructive',
        handler: async () => {
          await this.appStorageService.clearSavedData();

          const toast = await this.toastController.create({
            message: 'Saved data cleared.',
            duration: 2000,
            position: 'bottom',
            color: 'success',
          });

          await toast.present();
        },
      },
    ],
  });

  await alert.present();
}

toggleTheme() {
  document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
  localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
}

}