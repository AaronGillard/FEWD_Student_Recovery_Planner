import { AppModule, AppStorageService } from 'src/app/services/storage';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
  ],
})
export class TaskFormPage implements OnInit {
  taskTitle = '';
  dueDate = '';
  selectedModule = '';
  priority = '';
  savedMessage = '';
  errorMessage = '';

  modules: AppModule[] = [];

  constructor(private appStorageService: AppStorageService) {}

  async ngOnInit() {
    this.modules = await this.appStorageService.getModules();
  }

  async saveTask() {
    this.savedMessage = '';
    this.errorMessage = '';

    if (
      !this.taskTitle.trim() ||
      !this.dueDate ||
      !this.selectedModule ||
      !this.priority
    ) {
      this.errorMessage = 'Please complete all fields before saving.';
      return;
    }

    const newTask = {
      title: this.taskTitle,
      dueDate: this.dueDate,
      selectedModule: this.selectedModule,
      priority: this.priority,
    };

    await this.appStorageService.addTask(newTask);

    this.savedMessage = 'Task saved successfully.';

    this.taskTitle = '';
    this.dueDate = '';
    this.selectedModule = '';
    this.priority = '';
  }
}
