import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
} from '@ionic/angular/standalone';
import {
  RecoveryResource,
  RecoveryResourcesService,
} from 'src/app/services/recovery-resources.service';
import { AppTask, AppStorageService } from 'src/app/services/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
  ],
})
export class DashboardPage implements OnInit {
  resources: RecoveryResource[] = [];
  tasks: AppTask[] = [];

  constructor(
    private recoveryResourcesService: RecoveryResourcesService,
    private appStorageService: AppStorageService,
  ) {}

  async ngOnInit() {
    this.recoveryResourcesService.getResources().subscribe((data) => {
      this.resources = data;
    });

    await this.loadTasks();
  }

  async ionViewWillEnter() {
    await this.loadTasks();
  }

  private async loadTasks(): Promise<void> {
    this.tasks = await this.appStorageService.getTasks();
  }

  private getTaskDate(task: AppTask): Date {
    return new Date(`${task.dueDate}T00:00:00`);
  }

  get overdueTasksCount(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.tasks.filter((task) => {
      const taskDate = this.getTaskDate(task);
      return task.status !== 'Completed' && taskDate < today;
    }).length;
  }

  get dueThisWeekCount(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return this.tasks.filter((task) => {
      const taskDate = this.getTaskDate(task);
      return (
        task.status !== 'Completed' && taskDate >= today && taskDate <= nextWeek
      );
    }).length;
  }

  get completedTasksCount(): number {
    return this.tasks.filter((task) => task.status === 'Completed').length;
  }
}
