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

  constructor(
    private recoveryResourcesService: RecoveryResourcesService
  ) {}

  ngOnInit() {
    this.recoveryResourcesService.getResources().subscribe((data) => {
      this.resources = data;
    });
  }
}