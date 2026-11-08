import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSavedContentDto } from './dto/create-saved-content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SavedContent } from './entities/saved-content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SavedContentsService {
  constructor(
    @InjectRepository(SavedContent)
    private savedContentRepository: Repository<SavedContent>,
  ) {}

  async create(
    createSavedContentDto: CreateSavedContentDto,
  ): Promise<SavedContent> {
    const savedContent: SavedContent = this.savedContentRepository.create(
      createSavedContentDto,
    );
    return await this.savedContentRepository.save(savedContent);
  }

  async findAll(): Promise<SavedContent[]> {
    return await this.savedContentRepository.find();
  }

  async findOne(id: number): Promise<SavedContent | null> {
    return await this.savedContentRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const savedContentExists: boolean =
      await this.savedContentRepository.exists({
        where: { id },
      });

    if (!savedContentExists) {
      throw new NotFoundException();
    }

    return await this.savedContentRepository.delete(id);
  }
}
