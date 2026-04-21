import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  private storage: Storage | null = null;

  constructor(private ionicStorage: Storage) {
    this.init();
  }

  async init() {
    if (this.storage) {
      return;
    }

    const storage = await this.ionicStorage.create();
    this.storage = storage;
  }

  async getTasks() {
    await this.init();

    const tasks = await this.storage?.get('tasks');
    return tasks || [];
  }

  async addTask(task: { title: string; dueDate: string; selectedModule: string; priority: string }) {
    await this.init();

    const existingTasks = await this.getTasks();
    existingTasks.push(task);
    await this.storage?.set('tasks', existingTasks);
  }

  getModules() {
  return [
    {
      name: 'Front-End Web Development',
      code: 'FEWD',
      lecturer: 'Module Lecturer',
      tasks: 3,
      colour: 'primary',
    },
    {
      name: 'Database Development',
      code: 'DBD',
      lecturer: 'Module Lecturer',
      tasks: 2,
      colour: 'success',
    },
    {
      name: 'Software Quality and Testing',
      code: 'SQT',
      lecturer: 'Module Lecturer',
      tasks: 1,
      colour: 'warning',
    },
  ];
}

async getTaskCountForModule(moduleName: string) {
  const tasks = await this.getTasks();
  return tasks.filter((task: { selectedModule: string }) => task.selectedModule === moduleName).length;
}
}