import { Injectable } from '@nestjs/common';
import { CreateSavedContentDto } from './dto/create-saved-content.dto';
import { UpdateSavedContentDto } from './dto/update-saved-content.dto';

@Injectable()
export class SavedContentsService {
  create(createSavedContentDto: CreateSavedContentDto) {
    return 'This action adds a new savedContent';
  }

  findAll() {
    return `This action returns all savedContents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} savedContent`;
  }

  update(id: number, updateSavedContentDto: UpdateSavedContentDto) {
    return `This action updates a #${id} savedContent`;
  }

  remove(id: number) {
    return `This action removes a #${id} savedContent`;
  }
}
