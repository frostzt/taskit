import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  id: 'some-random-id',
  username: 'frostzt',
  password: 'somepassword',
  tasks: [],
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('Calls TasksRepository.getTasks and returns the results', async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      tasksRepository.getTasks.mockResolvedValue('somevalue');
      const results = await tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(results).toEqual('somevalue');
    });
  });

  describe('getTasksById', () => {
    it('Calls TasksRepository.findOne and returns the results', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test description',
        id: 'some-random-id',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('some-random-id', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('Calls TasksRepository.findOne and handles errors', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(
        tasksService.getTaskById('some-random-id', mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
