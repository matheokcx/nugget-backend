import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoleEnum } from '../enums/user-role.enum';
import { SavedContent } from '../../content/saved-contents/entities/saved-content.entity';
import { SummaryUsage } from '../../content/summary-usages/entities/summary-usage.entity';
import { Subscription } from '../../subscription/subscriptions/entities/subscription.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 80,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 100,
    select: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @OneToMany(
    () => SavedContent,
    (savedContent: SavedContent) => savedContent.user,
  )
  savedContents: SavedContent[];

  @OneToOne(() => SummaryUsage)
  @JoinColumn()
  summaryUsage: SummaryUsage;

  @OneToOne(() => Subscription)
  @JoinColumn()
  subscription: Subscription;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
