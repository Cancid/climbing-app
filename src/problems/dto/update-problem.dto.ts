import { IsEnum } from 'class-validator';
import { ProblemAttempts } from '../problem-attempts.enum';

export class UpdateProblemDto {
  @IsEnum(ProblemAttempts)
  attempts: ProblemAttempts;
}
