import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Get all tasks
  @Get()
  public getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  // Get task by id
  @Get('/:id')
  public getTaskById(@Param('id') id): Task | string {
    return this.tasksService.getTaskById(id);
  }

  // Delete a task by id
  @Delete('/:id')
  public deleteTask(@Param('id') id): string {
    if (this.tasksService.deleteTask(id)) {
      return 'Success';
    }
    return 'No such task found!';
  }

  // Create a new task
  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
