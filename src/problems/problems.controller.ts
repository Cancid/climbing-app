// eslint-disable-next-line prettier/prettier
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/user.entity';
import { CreateProblemDto } from './dto/create-problem.dto';
import { GetProblemFiltersDto } from './dto/get-problem-filter.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { Problem } from './problem.entity';
import { ProblemsService } from './problems.service';

@Controller('problems')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ProblemsController {
  constructor(private problemsService: ProblemsService) {}

  @Get()
  getProblems(
    @Query()
    filterDto: GetProblemFiltersDto,
    @GetUser()
    user: User,
  ): Promise<Problem[]> {
    return this.problemsService.getProblems(filterDto, user);
  }

  @Post()
  createProblem(
    @Body()
    createProblemDto: CreateProblemDto,
    @GetUser()
    user: User,
  ): Promise<Problem> {
    return this.problemsService.createProblem(createProblemDto, user);
  }

  @Get('/:id')
  getProblemById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Problem> {
    return this.problemsService.getProblemById(id, user);
  }

  @Delete('/:id')
  deleteProblem(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.problemsService.deleteProblem(id, user);
  }

  @Patch('/:id/attempts')
  updateProblem(
    @Param('id') id: string,
    @Body() updateProblemDto: UpdateProblemDto,
    @GetUser() user: User,
  ): Promise<Problem> {
    return this.problemsService.updateProblem(id, updateProblemDto, user);
  }
}
