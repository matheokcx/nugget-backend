import { Module } from '@nestjs/common';
import { SummaryUsagesService } from './summary-usages.service';
import { SummaryUsagesController } from './summary-usages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryUsage } from './entities/summary-usage.entity';

@Module({
  controllers: [SummaryUsagesController],
  providers: [SummaryUsagesService],
  imports: [TypeOrmModule.forFeature([SummaryUsage])],
})
export class SummaryUsagesModule {}
