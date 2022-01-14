import { IsNotEmpty } from 'class-validator';
import { ProblemAttempts } from '../problem-attempts.enum';

export class CreateProblemDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  grade: string;

  @IsNotEmpty()
  attempts: ProblemAttempts;
  //   date: Date;
  //   rating: number;
  //   description: string;
}
