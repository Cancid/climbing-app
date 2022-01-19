import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { ProblemAttempts } from './problem-attempts.enum';
import { GetProblemFiltersDto } from './dto/get-problem-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemsRepository } from './problems.repository';
import { Problem } from './problem.entity';
import { User } from 'src/auth/user.entity';
import { UpdateProblemDto } from './dto/update-problem.dto';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(ProblemsRepository)
    private problemsRepository: ProblemsRepository,
  ) {}

  getProblems(filterDto: GetProblemFiltersDto, user: User): Promise<Problem[]> {
    return this.problemsRepository.getProblems(filterDto, user);
  }

  createProblem(
    createProblemDto: CreateProblemDto,
    user: User,
  ): Promise<Problem> {
    return this.problemsRepository.createProblem(createProblemDto, user);
  }

  async getProblemById(id: string, user: User): Promise<Problem> {
    const found = await this.problemsRepository.findOne({
      where: { id, user },
    });

    if (!found) {
      throw new NotFoundException(`Problem with ID "${id}" not found!`);
    }
    return found;
  }

  async deleteProblem(id: string, user: User): Promise<void> {
    const result = await this.problemsRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found!`);
    }
  }

  // eslint-disable-next-line prettier/prettier
  async updateProblem(id: string, updateProblemDto: UpdateProblemDto, user: User): Promise<Problem> {
    const { attempts, rating } = updateProblemDto;
    const problem = await this.getProblemById(id, user);

    if (attempts) {
      problem.attempts = attempts;
    }

    if (rating) {
      problem.rating = rating;
    }
    this.problemsRepository.save(problem);
    return problem;
  }
}
