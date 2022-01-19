import {
  IsDateString,
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProblemAttempts } from '../problem-attempts.enum';

export class GetProblemFiltersDto {
  @IsOptional()
  @IsEnum(ProblemAttempts)
  attempts?: ProblemAttempts;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsDateString()
  afterDate?: string;

  @IsOptional()
  @IsDateString()
  beforeDate?: string;

  @IsOptional()
  @IsIn(['1', '2', '3'])
  rating?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
