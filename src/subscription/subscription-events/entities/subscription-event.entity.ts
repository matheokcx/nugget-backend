import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity('subscription_events')
export class SubscriptionEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'revenue_cat_event_id',
  })
  revenueCatEventId: string;

  @Column({
    name: 'event_type',
  })
  eventType: string;

  @Column({
    name: 'received_at',
  })
  receivedAt: Date;

  @Column({
    name: 'processed_at',
  })
  processedAt: Date;

  @ManyToOne(
    () => Subscription,
    (subscription: Subscription) => subscription.subscriptionEvents,
  )
  subscription: Subscription;

  @CreateDateColumn({
    name: 'created_at',
  })
  occurredAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
