import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionEvent } from './entities/subscription-event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionEventsService {
  constructor(
    @InjectRepository(SubscriptionEvent)
    private subscriptionEventRepository: Repository<SubscriptionEvent>,
  ) {}

  async create(
    createSubscriptionEventDto: unknown,
  ): Promise<SubscriptionEvent> {
    const subscriptionEvent: SubscriptionEvent =
      this.subscriptionEventRepository.create(
        createSubscriptionEventDto as SubscriptionEvent,
      );
    return await this.subscriptionEventRepository.save(subscriptionEvent);
  }

  async findAll(): Promise<SubscriptionEvent[]> {
    return await this.subscriptionEventRepository.find();
  }

  async findOne(id: number): Promise<SubscriptionEvent | null> {
    return await this.subscriptionEventRepository.findOneBy({ id });
  }

  async update(id: number, updateSubscriptionEventDto: unknown) {
    return await this.subscriptionEventRepository.update(
      id,
      updateSubscriptionEventDto as SubscriptionEvent,
    );
  }

  async remove(id: number) {
    const subscriptionEventExists: boolean =
      await this.subscriptionEventRepository.exists({
        where: { id },
      });

    if (!subscriptionEventExists) {
      throw new NotFoundException();
    }

    return await this.subscriptionEventRepository.delete(id);
  }
}
