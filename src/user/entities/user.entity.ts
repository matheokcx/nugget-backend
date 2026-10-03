import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoleEnum } from '../enums/user-role.enum';

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

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
