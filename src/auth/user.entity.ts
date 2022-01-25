import { Problem } from '../problems/problem.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => Problem, (problem) => problem.user, { eager: true })
  problems: Problem[];
}
