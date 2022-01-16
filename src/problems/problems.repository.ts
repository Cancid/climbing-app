import { EntityRepository, Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { GetProblemFiltersDto } from './dto/get-problem-filter.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './problem.entity';

@EntityRepository(Problem)
export class ProblemsRepository extends Repository<Problem> {
  // eslint-disable-next-line prettier/prettier
  
  async getProblems(filterDto: GetProblemFiltersDto): Promise<Problem[]> {
    const { grade, attempts, search } = filterDto;
    const query = this.createQueryBuilder('problem');

    if (grade) {
      query.andWhere('problem.grade = :grade', { grade });
    }

    if (attempts) {
      query.andWhere('problem.attempts = :attempts', { attempts });
    }

    if (search) {
      query.andWhere(
        'LOWER(problem.title) LIKE LOWER(:search)',
        // eslint-disable-next-line prettier/prettier
      { search: `%${search}%` } 
      );
    }

    const problems = await query.getMany();
    return problems;
  }

  async createProblem(createProblemDto: CreateProblemDto): Promise<Problem> {
    const { title, grade, attempts } = createProblemDto;

    const problem = this.create({
      title,
      grade,
      attempts,
    });

    await this.save(problem);
    return problem;
  }
}
