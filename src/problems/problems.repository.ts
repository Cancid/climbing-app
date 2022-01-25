import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProblemDto } from './dto/create-problem.dto';
import { GetProblemFiltersDto } from './dto/get-problem-filter.dto';
import { Problem } from './problem.entity';

@EntityRepository(Problem)
export class ProblemsRepository extends Repository<Problem> {
  // eslint-disable-next-line prettier/prettier
  
  async getProblems(
    filterDto: GetProblemFiltersDto,
    user: User,
  ): Promise<Problem[]> {
    const { grade, attempts, search, afterDate, beforeDate, rating } =
      filterDto;
    const query = this.createQueryBuilder('problem');
    query.where({ user });

    if (grade) {
      query.andWhere('problem.grade = :grade', { grade });
    }

    if (attempts) {
      query.andWhere('problem.attempts = :attempts', { attempts });
    }

    if (afterDate) {
      query.andWhere('problem.date > :afterDate', { afterDate });
    }

    if (beforeDate) {
      query.andWhere('problem.date < :beforeDate', { beforeDate });
    }

    if (rating) {
      query.andWhere('problem.rating >= :rating', { rating });
    }

    if (search) {
      query.andWhere(
        '(LOWER(problem.title) LIKE LOWER(:search) OR LOWER(problem.description) LIKE LOWER(:search))',
        // eslint-disable-next-line prettier/prettier
      { search: `%${search}%` } 
      );
    }

    const problems = await query.printSql().getMany();
    return problems;
  }

  async createProblem(
    createProblemDto: CreateProblemDto,
    user: User,
  ): Promise<Problem> {
    const { title, grade, attempts, date, rating, description } =
      createProblemDto;
    const problem = this.create({
      title,
      grade,
      attempts,
      date,
      rating,
      description,
      user,
    });
    console.log(problem);
    await this.save(problem);
    return problem;
  }
}
