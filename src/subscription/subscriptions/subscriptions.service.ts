import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const subscription: Subscription = this.subscriptionsRepository.create(
      createSubscriptionDto,
    );
    return await this.subscriptionsRepository.save(subscription);
  }

  async findAll(): Promise<Subscription[]> {
    return await this.subscriptionsRepository.find();
  }

  async findOne(id: number): Promise<Subscription | null> {
    return await this.subscriptionsRepository.findOneBy({ id });
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return await this.subscriptionsRepository.update(id, updateSubscriptionDto);
  }

  async remove(id: number) {
    const subscriptionExists: boolean =
      await this.subscriptionsRepository.exists({
        where: { id },
      });

    if (!subscriptionExists) {
      throw new NotFoundException();
    }

    return await this.subscriptionsRepository.delete(id);
  }
}
