import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface AppTask {
  id: string;
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

  async addTask(task: Omit<AppTask, 'status' | 'id'>): Promise<void> {
  await this.init();
  const existingTasks = await this.getTasks();

  const taskToSave: AppTask = {
    ...task,
    id: Date.now().toString(),
    status: 'To Do',
  };

  existingTasks.push(taskToSave);
  await this.storage?.set('tasks', existingTasks);
}

async addModule(module: Omit<AppModule, 'tasks'>): Promise<void> {
  await this.init();
  const existingModules = await this.getModules();

  const moduleToSave: AppModule = {
    ...module,
    tasks: 0,
  };

  existingModules.push(moduleToSave);
  await this.storage?.set('modules', existingModules);
}

async toggleTaskStatus(taskId: string): Promise<void> {
  await this.init();
  const existingTasks = await this.getTasks();

  const updatedTasks = existingTasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        status: task.status === 'Completed' ? 'To Do' : 'Completed',
      };
    }

    return task;
  });

  await this.storage?.set('tasks', updatedTasks);
}

async getModules(): Promise<AppModule[]> {
  await this.init();
  return (await this.storage?.get('modules')) || [];
}

async getTaskCountForModule(moduleName: string) {
  const tasks = await this.getTasks();
  return tasks.filter((task: { selectedModule: string }) => task.selectedModule === moduleName).length;
}

async deleteTask(taskId: string): Promise<void> {
  await this.init();
  const existingTasks = await this.getTasks();

  const updatedTasks = existingTasks.filter((task) => task.id !== taskId);

  await this.storage?.set('tasks', updatedTasks);
}

async deleteModule(moduleName: string): Promise<void> {
  await this.init();
  const existingModules = await this.getModules();

  const updatedModules = existingModules.filter(
    (module) => module.name !== moduleName
  );

  await this.storage?.set('modules', updatedModules);
}

async clearSavedData(): Promise<void> {
  await this.init();
  await this.storage?.remove('tasks');
  await this.storage?.remove('modules');
}

}