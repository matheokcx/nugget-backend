import { Controller, Get, Param } from '@nestjs/common';
import { SummaryUsagesService } from './summary-usages.service';

@Controller('summary-usages')
export class SummaryUsagesController {
  constructor(private readonly summaryUsagesService: SummaryUsagesService) {}

  @Get()
  findAll() {
    return this.summaryUsagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.summaryUsagesService.findOne(+id);
  }
}
