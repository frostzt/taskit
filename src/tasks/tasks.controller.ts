import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatus } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Get all tasks
  @Get()
  public getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksFilter(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  // Get task by id
  @Get('/:id')
  public getTaskById(@Param('id') id): Task {
    return this.tasksService.getTaskById(id);
  }

  // Delete a task by id
  @Delete('/:id')
  public deleteTask(@Param('id') id): void {
    return this.tasksService.deleteTask(id);
  }

  // Update a task status
  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatus,
  ): Task {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(id, status);
  }

  // Create a new task
  @Post()
  public createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
