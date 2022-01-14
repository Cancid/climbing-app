import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemsController } from './problems.controller';
import { ProblemsRepository } from './problems.repository';
import { ProblemsService } from './problems.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemsRepository])],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule {}
