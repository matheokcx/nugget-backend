import { Module } from '@nestjs/common';
import { SubscriptionEventsModule } from './subscription-events/subscription-events.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [SubscriptionEventsModule, SubscriptionsModule],
})
export class SubscriptionModule {}
