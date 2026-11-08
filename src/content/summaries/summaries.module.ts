import { Module } from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { SummariesController } from './summaries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summary } from './entities/summary.entity';

@Module({
  controllers: [SummariesController],
  providers: [SummariesService],
  imports: [TypeOrmModule.forFeature([Summary])],
})
export class SummariesModule {}
