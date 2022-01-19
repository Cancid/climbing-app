import { IsDate, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ProblemAttempts } from '../problem-attempts.enum';

export class CreateProblemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  grade: string;

  @IsNotEmpty()
  attempts: ProblemAttempts;

  date: string;

  rating: number;

  description: string;
}
