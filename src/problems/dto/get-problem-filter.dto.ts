import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProblemAttempts } from '../problem-attempts.enum';

export class GetProblemFiltersDto {
  @IsOptional()
  @IsEnum(ProblemAttempts)
  attempts?: ProblemAttempts;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
