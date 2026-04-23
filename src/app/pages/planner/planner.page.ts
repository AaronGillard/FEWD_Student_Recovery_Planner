import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppTask, AppStorageService } from 'src/app/services/storage';
import { FormsModule } from '@angular/forms';
import { LocalNotifications } from '@capacitor/local-notifications';
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
  IonToast,
  IonDatetime,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
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
    IonToast,
    IonDatetime,
  ],
})
export class PlannerPage implements OnInit {
  currentFilter = 'all';
  tasks: AppTask[] = [];
  reminderToastOpen = false;
  reminderToastMessage = '';
  activeReminderTask: AppTask | null = null;
  selectedReminderDateTime = '';

  constructor(private appStorageService: AppStorageService) {}

  async ngOnInit() {
    await this.loadTasks();  
  }

  async ionViewWillEnter() {
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

showReminderToast(message: string) {
  this.reminderToastMessage = message;
  this.reminderToastOpen = true;
}

closeReminderToast() {
  this.reminderToastOpen = false;
}

startReminderSetup(task: AppTask) {
  this.activeReminderTask = task;
  this.selectedReminderDateTime = '';
}
async confirmReminderSetup(): Promise<void> {
  if (!this.activeReminderTask) {
    this.showReminderToast('No task selected for a reminder.');
    return;
  }

  if (!this.selectedReminderDateTime) {
    this.showReminderToast('Please choose a date and time first.');
    return;
  }

  const reminderDate = new Date(this.selectedReminderDateTime);

  if (reminderDate <= new Date()) {
    this.showReminderToast('Please choose a future date and time.');
    return;
  }

  const permissionStatus = await LocalNotifications.checkPermissions();

  if (permissionStatus.display !== 'granted') {
    const requestResult = await LocalNotifications.requestPermissions();

    if (requestResult.display !== 'granted') {
      this.showReminderToast('Notification permission was not granted.');
      return;
    }
  }

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: new Date().getTime() % 1000000,
          title: 'Task Reminder',
          body: `Work on: ${this.activeReminderTask.title}`,
          schedule: { at: reminderDate },
        },
      ],
    });

    const formattedReminderTime = reminderDate.toLocaleString();

    this.showReminderToast(
      `Reminder set for "${this.activeReminderTask.title}" at ${formattedReminderTime}.`
    );

    this.activeReminderTask = null;
    this.selectedReminderDateTime = '';
  } catch {
    this.showReminderToast('Could not schedule the reminder.');
  }
}

cancelReminderSetup() {
  this.activeReminderTask = null;
  this.selectedReminderDateTime = '';
}
}