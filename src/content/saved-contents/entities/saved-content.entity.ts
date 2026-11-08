import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { AuthorizedPlatformsEnum } from '../enums/authorized-platforms.enum';
import { Summary } from '../../summaries/entities/summary.entity';

@Entity('saved_contents')
export class SavedContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({
    type: 'enum',
    enum: AuthorizedPlatformsEnum,
  })
  platform: AuthorizedPlatformsEnum;

  @Column()
  duration: number;

  @ManyToOne(() => User, (user: User) => user.savedContents)
  user: User;

  @OneToMany(() => Summary, (summary: Summary) => summary.savedContent)
  summaries: Summary[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
