import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne((_type) => User, (user) => user.problems, { eager: false })
  user: User;
}
