import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppTask, AppStorageService } from 'src/app/services/storage';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonProgressBar,
  IonTitle,
  IonToolbar,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonProgressBar,
    IonButton,
  ],
})
export class ProgressPage implements OnInit {
  tasks: AppTask[] = [];

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

  get totalTasks(): number {
    return this.tasks.length;
  }

  get completedTasks(): number {
    return this.tasks.filter((task) => task.status === 'Completed').length;
  }

  get pendingTasks(): number {
    return this.totalTasks - this.completedTasks;
  }

  get completionRate(): number {
    if (this.totalTasks === 0) {
      return 0;
    }

    return Math.round((this.completedTasks / this.totalTasks) * 100);
  }

  get progressValue(): number {
    return this.completionRate / 100;
  }

  get progressMessage(): string {
    if (this.completionRate >= 80) {
      return 'Excellent progress. You are well on top of your workload.';
    }

    if (this.completionRate >= 50) {
      return 'Good progress. Keep building momentum.';
    }

    return 'A strong start. Focus on one task at a time.';
  }
}
