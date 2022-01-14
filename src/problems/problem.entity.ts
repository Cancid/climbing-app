import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProblemAttempts } from './problem-attempts.enum';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  grade: string;

  @Column()
  attempts: ProblemAttempts;
}
