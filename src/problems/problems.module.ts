import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProblemsController } from './problems.controller';
import { ProblemsRepository } from './problems.repository';
import { ProblemsService } from './problems.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProblemsRepository]), AuthModule],
  controllers: [ProblemsController],
  providers: [ProblemsService],
})
export class ProblemsModule {}
