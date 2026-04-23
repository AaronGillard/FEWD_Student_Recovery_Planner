import { AppModule, AppStorageService } from 'src/app/services/storage';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
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
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
  ],
})

export class ModulesPage implements OnInit {
  showAddModuleForm = false;
  modules: AppModule[] = [];
  moduleName = '';
  moduleCode = '';
  moduleLecturer = '';
  moduleColour = 'primary';

  constructor(private appStorageService: AppStorageService, private alertController: AlertController) {}

  async ngOnInit() {
  await this.loadModules();
}

  async ionViewWillEnter() {
    await this.loadModules();
  }

private async loadModules(): Promise<void> {
  const baseModules = await this.appStorageService.getModules();

  this.modules = await Promise.all(
    baseModules.map(async (module) => ({
      ...module,
      tasks: await this.appStorageService.getTaskCountForModule(module.name),
    }))
  );
}

async saveModule(): Promise<void> {
  if (
    !this.moduleName.trim() ||
    !this.moduleCode.trim() ||
    !this.moduleLecturer.trim()
  ) {
    return;
  }

  const newModule = {
    name: this.moduleName.trim(),
    code: this.moduleCode.trim(),
    lecturer: this.moduleLecturer.trim(),
    colour: this.moduleColour,
  };

  await this.appStorageService.addModule(newModule);

  this.moduleName = '';
  this.moduleCode = '';
  this.moduleLecturer = '';
  this.moduleColour = 'primary';
  this.showAddModuleForm = false;

  await this.loadModules();
}

async deleteModule(module: AppModule): Promise<void> {
  if (module.tasks > 0) {
    const blockedAlert = await this.alertController.create({
      header: 'Cannot Delete Module',
      message: 'This module still has active tasks assigned to it. Remove those tasks first.',
      buttons: ['OK'],
    });

    await blockedAlert.present();
    return;
  }

  const confirmAlert = await this.alertController.create({
    header: 'Delete Module?',
    message: `This will permanently delete "${module.name}".`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: async () => {
          await this.appStorageService.deleteModule(module.name);
          await this.loadModules();
        },
      },
    ],
  });

  await confirmAlert.present();
}

}