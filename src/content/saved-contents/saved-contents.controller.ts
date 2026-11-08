import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SavedContentsService } from './saved-contents.service';
import { CreateSavedContentDto } from './dto/create-saved-content.dto';
import { SavedContent } from './entities/saved-content.entity';

@Controller('saved-contents')
export class SavedContentsController {
  constructor(private readonly savedContentsService: SavedContentsService) {}

  @Post()
  async create(
    @Body() createSavedContentDto: CreateSavedContentDto,
  ): Promise<SavedContent> {
    return await this.savedContentsService.create(createSavedContentDto);
  }

  @Get()
  async findAll(): Promise<SavedContent[]> {
    return await this.savedContentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SavedContent | null> {
    return await this.savedContentsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.savedContentsService.remove(+id);
  }
}
