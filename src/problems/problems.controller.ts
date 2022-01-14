// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProblemDto } from './dto/create-problem.dto';
import { GetProblemFiltersDto } from './dto/get-problem-filter.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './problem.entity';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private problemsService: ProblemsService) {}

  @Get()
  getProblems(@Query() filterDto: GetProblemFiltersDto): Promise<Problem[]> {
    return this.problemsService.getProblems(filterDto);
  }

  @Post()
  createProblem(@Body() createProblemDto: CreateProblemDto): Promise<Problem> {
    return this.problemsService.createProblem(createProblemDto);
  }

  @Get('/:id')
  getProblemById(@Param('id') id: string): Promise<Problem> {
    return this.problemsService.getProblemById(id);
  }

  @Delete('/:id')
  deleteProblem(@Param('id') id: string): Promise<void> {
    return this.problemsService.deleteProblem(id);
  }

  @Patch('/:id/attempts')
  updateProblem(
    @Param('id') id: string,
    @Body() updateProblemDto: UpdateProblemDto,
  ): Promise<Problem> {
    const { attempts } = updateProblemDto;
    return this.problemsService.updateAttempts(id, attempts);
  }
}
