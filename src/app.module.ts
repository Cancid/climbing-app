import { Module } from '@nestjs/common';
import { ProblemsModule } from './problems/problems.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ProblemsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'climbing-app',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
