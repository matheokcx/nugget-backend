import { Injectable } from '@nestjs/common';

@Injectable()
export class SummaryUsagesService {
  create() {
    return 'This action adds a new summaryUsage';
  }

  findAll() {
    return `This action returns all summaryUsages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} summaryUsage`;
  }

  update(id: number) {
    return `This action updates a #${id} summaryUsage`;
  }

  remove(id: number) {
    return `This action removes a #${id} summaryUsage`;
  }
}
