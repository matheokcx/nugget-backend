import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SavedContent } from '../../saved-contents/entities/saved-content.entity';
import { File } from '../../../files/entities/file.entity';

@Entity('summaries')
export class Summary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  summary: string;

  @ManyToOne(
    () => SavedContent,
    (savedContent: SavedContent) => savedContent.summaries,
  )
  savedContent: SavedContent;

  @OneToMany(() => File, (file: File) => file.summary)
  files: File[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
