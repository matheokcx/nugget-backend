import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SummariesService } from './summaries.service';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { Summary } from './entities/summary.entity';

@Controller('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Post()
  async create(@Body() createSummaryDto: CreateSummaryDto): Promise<Summary> {
    return await this.summariesService.create(createSummaryDto);
  }

  @Get()
  async findAll(): Promise<Summary[]> {
    return await this.summariesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Summary | null> {
    return await this.summariesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSummaryDto: UpdateSummaryDto,
  ) {
    return await this.summariesService.update(+id, updateSummaryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.summariesService.remove(+id);
  }
}
