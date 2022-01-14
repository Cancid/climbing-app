import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { ProblemAttempts } from './problem-attempts.enum';
import { GetProblemFiltersDto } from './dto/get-problem-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemsRepository } from './problems.repository';
import { Problem } from './problem.entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(ProblemsRepository)
    private problemsRepository: ProblemsRepository,
  ) {}

  getProblems(filterDto: GetProblemFiltersDto): Promise<Problem[]> {
    return this.problemsRepository.getProblems(filterDto);
  }

  createProblem(createProblemDto: CreateProblemDto): Promise<Problem> {
    return this.problemsRepository.createProblem(createProblemDto);
  }

  async getProblemById(id: string): Promise<Problem> {
    const found = await this.problemsRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Problem with ID "${id}" not found!`);
    }
    return found;
  }

  async deleteProblem(id: string): Promise<void> {
    const result = await this.problemsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found!`);
    }
  }

  // eslint-disable-next-line prettier/prettier
  async updateAttempts(id: string, attempts: ProblemAttempts): Promise<Problem> {
    const problem = await this.getProblemById(id);
    problem.attempts = attempts;
    this.problemsRepository.save(problem);
    return problem;
  }
}
