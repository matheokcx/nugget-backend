import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubscriptionEvent } from '../../subscription-events/entities/subscription-event.entity';
import { SubscriptionStatusEnum } from '../enums/subscription-status.enum';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'entitlement_id',
  })
  entitlementId: string;

  @Column({
    name: 'product_id',
  })
  productId: string;

  @Column()
  store: string;

  @Column()
  environment: string;

  @Column({
    name: 'original_transaction_id',
  })
  originalTransactionId: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatusEnum,
    default: SubscriptionStatusEnum.ACTIVE,
  })
  status: SubscriptionStatusEnum;

  @Column({
    name: 'will_renew',
    default: true,
  })
  willRenew: boolean;

  @Column({
    name: 'starts_at',
  })
  startsAt: Date;

  @Column({
    name: 'expires_at',
  })
  expiresAt: Date;

  @Column({
    name: 'grace_period_expires_at',
  })
  gracePeriodExpiresAt: Date;

  @Column({
    name: 'last_event_at',
  })
  lastEventAt: Date;

  @OneToMany(
    () => SubscriptionEvent,
    (subscriptionEvent: SubscriptionEvent) => subscriptionEvent.subscription,
  )
  subscriptionEvents: SubscriptionEvent[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
