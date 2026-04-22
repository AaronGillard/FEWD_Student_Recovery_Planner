import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Device } from '@capacitor/device';
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

  async ngOnInit() {
  const info = await Device.getInfo();

  this.platform = info.platform;
  this.operatingSystem = info.operatingSystem;
  this.osVersion = info.osVersion;
  this.model = info.model;
}

async scheduleTestNotification() {
  const permissionStatus = await LocalNotifications.checkPermissions();

  if (permissionStatus.display !== 'granted') {
    const requestResult = await LocalNotifications.requestPermissions();

    if (requestResult.display !== 'granted') {
      return;
    }
  }

  await LocalNotifications.schedule({
    notifications: [
      {
        id: 1,
        title: 'Study Reminder',
        body: 'Check your Planner and continue with your next task.',
        schedule: { at: new Date(Date.now() + 10000) },
      },
    ],
  });
}
}