import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionEventsService {
  create(createSubscriptionEventDto: unknown) {
    return 'This action adds a new subscriptionEvent';
  }

  findAll() {
    return `This action returns all subscriptionEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriptionEvent`;
  }

  update(id: number, updateSubscriptionEventDto: unknown) {
    return `This action updates a #${id} subscriptionEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionEvent`;
  }
}
