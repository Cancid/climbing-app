import { IsEnum, IsIn, IsOptional } from 'class-validator';
import { ProblemAttempts } from '../problem-attempts.enum';

export class UpdateProblemDto {
  @IsOptional()
  @IsEnum(ProblemAttempts)
  attempts: ProblemAttempts;

  @IsOptional()
  @IsIn(['1', '2', '3'])
  rating: number;
}
