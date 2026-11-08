import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { StoredUpload } from '@nestjs/storage';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@UploadedFile() file: StoredUpload | undefined) {
    return this.filesService.create(file);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
