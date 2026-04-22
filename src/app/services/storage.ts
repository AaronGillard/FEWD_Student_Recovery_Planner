import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface AppTask {
  title: string;
  dueDate: string;
  selectedModule: string;
  priority: string;
  status: 'To Do' | 'Completed';
}

export interface AppModule {
  name: string;
  code: string;
  lecturer: string;
  tasks: number;
  colour: string;
}

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

  async getTasks(): Promise<AppTask[]> {
  await this.init();
  return (await this.storage?.get('tasks')) || [];
}

  async addTask(task: Omit<AppTask, 'status'>): Promise<void> {
  await this.init();
  const existingTasks = await this.getTasks();

  const taskToSave: AppTask = {
    ...task,
    status: 'To Do',
  };

  existingTasks.push(taskToSave);
  await this.storage?.set('tasks', existingTasks);
}

getModules(): AppModule[] {
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