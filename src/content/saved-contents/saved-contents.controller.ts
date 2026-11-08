import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SavedContentsService } from './saved-contents.service';
import { CreateSavedContentDto } from './dto/create-saved-content.dto';
import { UpdateSavedContentDto } from './dto/update-saved-content.dto';

@Controller('saved-contents')
export class SavedContentsController {
  constructor(private readonly savedContentsService: SavedContentsService) {}

  @Post()
  create(@Body() createSavedContentDto: CreateSavedContentDto) {
    return this.savedContentsService.create(createSavedContentDto);
  }

  @Get()
  findAll() {
    return this.savedContentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedContentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSavedContentDto: UpdateSavedContentDto,
  ) {
    return this.savedContentsService.update(+id, updateSavedContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedContentsService.remove(+id);
  }
}
