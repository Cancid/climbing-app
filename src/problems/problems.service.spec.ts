import { Test } from '@nestjs/testing';
import { ProblemsService } from './problems.service';
import { ProblemsRepository } from './problems.repository';
import { ProblemAttempts } from './problem-attempts.enum';
import { NotFoundException } from '@nestjs/common';

const mockProblemsRepository = () => ({
  getProblems: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  id: '123',
  username: 'test',
  email: 'test@test.com',
  password: 'passWord',
  problems: [],
};

describe('ProblemsService', () => {
  let problemsService: ProblemsService;
  let problemsRepository;

  beforeEach(async () => {
    // init NestJS module with problemsService, problemsModule
    const module = await Test.createTestingModule({
      providers: [
        ProblemsService,
        { provide: ProblemsRepository, useFactory: mockProblemsRepository },
      ],
    }).compile();

    problemsService = module.get<ProblemsService>(ProblemsService);
    problemsRepository = module.get<ProblemsRepository>(ProblemsRepository);
  });

  describe('getProblems', () => {
    it('calls ProblemsRepository.getProblems and returns result', async () => {
      problemsRepository.getProblems.mockResolvedValue('someValue');
      const result = await problemsService.getProblems(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getProblemsById', () => {
    it('calls ProblemsRepository.getProblemsById and returns result', async () => {
      const mockProblem = {
        id: 'someId',
        title: 'Test problem',
        grade: 'vtest',
        attempts: ProblemAttempts.FLASH,
        user: mockUser,
      };

      problemsRepository.findOne.mockResolvedValue(mockProblem);
      const result = await problemsService.getProblemById('someId', mockUser);
      expect(result).toEqual(mockProblem);
    });

    it('calls ProblemsRepository.getProblemId and handles an error', async () => {
      problemsRepository.findOne.mockResolvedValue(null);
      expect(
        problemsService.getProblemById('someId', mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
