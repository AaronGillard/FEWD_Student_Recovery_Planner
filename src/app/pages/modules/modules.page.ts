import { AppModule, AppStorageService } from 'src/app/services/storage';
import { Component, OnInit } from '@angular/core';
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

  constructor(private appStorageService: AppStorageService) {}

  async ngOnInit() {
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

}