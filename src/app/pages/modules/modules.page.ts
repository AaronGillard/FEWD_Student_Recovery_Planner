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

export class ModulesPage implements OnInit {
  
  constructor(private appStorageService: AppStorageService) {
    this.modules = this.appStorageService.getModules();
  }

  async ngOnInit() {
  const baseModules = this.appStorageService.getModules();

  this.modules = await Promise.all(
    baseModules.map(async (module) => ({
      ...module,
      tasks: await this.appStorageService.getTaskCountForModule(module.name),
    }))
  );
}

  modules: AppModule[] = [];

}