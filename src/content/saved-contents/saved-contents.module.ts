import { Module } from '@nestjs/common';
import { SavedContentsService } from './saved-contents.service';
import { SavedContentsController } from './saved-contents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedContent } from './entities/saved-content.entity';

@Module({
  controllers: [SavedContentsController],
  providers: [SavedContentsService],
  imports: [TypeOrmModule.forFeature([SavedContent])],
})
export class SavedContentsModule {}
