import { Injectable } from '@nestjs/common';
import { StoredUpload } from '@nestjs/storage';

@Injectable()
export class FilesService {
  create(file: StoredUpload | undefined) {
    return 'This action adds a new file';
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
