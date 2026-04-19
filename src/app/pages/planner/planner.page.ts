import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class PlannerPage {
  currentFilter = 'all';

  tasks = [
    {
      title: 'Complete dashboard layout',
      module: 'Front-End Web Development',
      dueDate: '18 Apr 2026',
      priority: 'High',
      status: 'To Do',
      category: 'overdue',
      colour: 'danger',
    },
    {
      title: 'Prepare SQL revision notes',
      module: 'Database Development',
      dueDate: '21 Apr 2026',
      priority: 'Medium',
      status: 'In Progress',
      category: 'week',
      colour: 'warning',
    },
    {
      title: 'Finish testing checklist',
      module: 'Software Quality and Testing',
      dueDate: '23 Apr 2026',
      priority: 'Low',
      status: 'Completed',
      category: 'completed',
      colour: 'success',
    },
  ];

  setFilter(filter: string) {
    this.currentFilter = filter;
  }

  get filteredTasks() {
    if (this.currentFilter === 'all') {
      return this.tasks;
    }

    return this.tasks.filter((task) => task.category === this.currentFilter);
  }
}