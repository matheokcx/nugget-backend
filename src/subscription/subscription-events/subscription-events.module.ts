import { Module } from '@nestjs/common';
import { SubscriptionEventsService } from './subscription-events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEvent } from './entities/subscription-event.entity';

@Module({
  providers: [SubscriptionEventsService],
  imports: [TypeOrmModule.forFeature([SubscriptionEvent])],
})
export class SubscriptionEventsModule {}
