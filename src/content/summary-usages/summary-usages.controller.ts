import { Controller, Get, Param } from '@nestjs/common';
import { SummaryUsagesService } from './summary-usages.service';
import { SummaryUsage } from './entities/summary-usage.entity';

@Controller('summary-usages')
export class SummaryUsagesController {
  constructor(private readonly summaryUsagesService: SummaryUsagesService) {}

  @Get()
  async findAll(): Promise<SummaryUsage[]> {
    return await this.summaryUsagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SummaryUsage | null> {
    return await this.summaryUsagesService.findOne(+id);
  }
}
