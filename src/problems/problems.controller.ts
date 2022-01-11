import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private problemsService: ProblemsService) {}
}

@Get('/:id')
getProblemById(@Param('id') id: string): Promise<Problem> {
  this.problemsService.getProblemById(id);
}