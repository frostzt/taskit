import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // Get all tasks
  public getAllTasks(): Task[] {
    return this.tasks;
  }

  // Get task by id
  public getTaskById(id): Task | string {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      return 'No task found';
    }

    return task;
  }

  // Delete a task
  public deleteTask(id): boolean {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }

  // Create a task
  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
