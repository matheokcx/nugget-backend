import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Summary } from './entities/summary.entity';

@Injectable()
export class SummariesService {
  constructor(
    @InjectRepository(Summary)
    private summaryRepository: Repository<Summary>,
  ) {}

  async create(createSummaryDto: CreateSummaryDto): Promise<Summary> {
    const summary: Summary = this.summaryRepository.create(createSummaryDto);
    return await this.summaryRepository.save(summary);
  }

  async findAll(): Promise<Summary[]> {
    return await this.summaryRepository.find();
  }

  async findOne(id: number): Promise<Summary | null> {
    return await this.summaryRepository.findOneBy({ id });
  }

  async update(id: number, updateSummaryDto: UpdateSummaryDto) {
    return await this.summaryRepository.update(id, updateSummaryDto);
  }

  async remove(id: number) {
    const summaryExists: boolean = await this.summaryRepository.exists({
      where: { id },
    });

    if (!summaryExists) {
      throw new NotFoundException();
    }

    return await this.summaryRepository.delete(id);
  }
}
