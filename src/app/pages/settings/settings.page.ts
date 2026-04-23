import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Device } from '@capacitor/device';
import { AppStorageService } from 'src/app/services/storage';
import { AlertController, ToastController } from '@ionic/angular';
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
  ],
})
export class SettingsPage implements OnInit {
  appName = 'Student Recovery Planner';
  theme = 'Light';

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
}

async clearSavedData() {
  const alert = await this.alertController.create({
    header: 'Clear Saved Data?',
    message: 'This will remove all saved planner tasks from this device.',
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

}