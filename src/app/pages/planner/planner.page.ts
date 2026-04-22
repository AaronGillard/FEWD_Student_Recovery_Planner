import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTask, AppStorageService } from 'src/app/services/storage';
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
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
export class PlannerPage implements OnInit {
  currentFilter = 'all';
  tasks: AppTask[] = [];

  constructor(private appStorageService: AppStorageService) {}

  async ngOnInit() {
    await this.loadTasks();  
  }

private async loadTasks(): Promise<void> {
  this.tasks = await this.appStorageService.getTasks();
}

async toggleTask(taskId: string): Promise<void> {
  await this.appStorageService.toggleTaskStatus(taskId);
  await this.loadTasks();
}

  private getTaskDate(task: AppTask): Date {
    return new Date(`${task.dueDate}T00:00:00`);
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  get filteredTasks() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  if (this.currentFilter === 'all') {
    return this.tasks;
  }

  if (this.currentFilter === 'completed') {
    return this.tasks.filter((task) => task.status === 'Completed');
  }

  if (this.currentFilter === 'overdue') {
    return this.tasks.filter((task) => {
      const taskDate = this.getTaskDate(task);
      return task.status !== 'Completed' && taskDate < today;
    });
  }

  if (this.currentFilter === 'week') {
    return this.tasks.filter((task) => {
      const taskDate = this.getTaskDate(task);
      return (
        task.status !== 'Completed' &&
        taskDate >= today &&
        taskDate <= nextWeek
      );
    });
  }

  return this.tasks;
}
}