import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SummaryUsage } from './entities/summary-usage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SummaryUsagesService {
  constructor(
    @InjectRepository(SummaryUsage)
    private summaryUsagesRepository: Repository<SummaryUsage>,
  ) {}

  async create(): Promise<SummaryUsage> {
    const summaryUsage: SummaryUsage = this.summaryUsagesRepository.create({});
    return await this.summaryUsagesRepository.save(summaryUsage);
  }

  async findAll(): Promise<SummaryUsage[]> {
    return await this.summaryUsagesRepository.find();
  }

  async findOne(id: number): Promise<SummaryUsage | null> {
    return await this.summaryUsagesRepository.findOneBy({ id });
  }

  // async update(id: number) {
  //   // Basée sur les noms d'abonnements revenueCat
  //   const limits = {
  //     nugget_default: 3,
  //     nugget_premium: 15,
  //   };
  // }
}
