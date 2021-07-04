import { Test } from '@nestjs/testing';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  getTasksById: jest.fn(),
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
    it('Calls TasksRepository.getTasksById and returns the results', async () => {
      tasksRepository.getTasksById.mockResolvedValue('somevalue');
      const results = await tasksService.getTaskById('random-id', mockUser);
      expect(results).toEqual('somevalue');
    });
  });
});
