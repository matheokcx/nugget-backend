import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('summary_usages')
export class SummaryUsage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @Column({
    name: 'reset_at',
  })
  resetAt: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
