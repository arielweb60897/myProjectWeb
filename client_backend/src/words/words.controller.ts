import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Post()
  async create(@Body() createWordDto: CreateWordDto) {
    console.log('Nest 收到:', createWordDto);
    const word = await this.wordsService.create(createWordDto);
    return {
      success: true,
      message: '新增成功',
      data: word,
    };
  }

  @Get()
  async findAll() {
    const words = await this.wordsService.findAll();
    return {
      success: true,
      message: '取得成功',
      data: words,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordsService.update(+id, updateWordDto);
  }

  @Delete()
  remove(@Body() body: { ids: number[] }) {
    return this.wordsService.remove(body.ids);
  }
}
