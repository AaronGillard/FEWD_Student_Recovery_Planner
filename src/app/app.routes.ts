import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'modules',
    loadComponent: () => import('./pages/modules/modules.page').then( m => m.ModulesPage)
  },
  {
    path: 'planner',
    loadComponent: () => import('./pages/planner/planner.page').then( m => m.PlannerPage)
  },
  {
    path: 'progress',
    loadComponent: () => import('./pages/progress/progress.page').then( m => m.ProgressPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
  {
    path: 'task-form',
    loadComponent: () => import('./pages/task-form/task-form.page').then( m => m.TaskFormPage)
  },
];
