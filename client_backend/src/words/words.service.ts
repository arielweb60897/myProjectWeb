import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class WordsService {
  constructor(private readonly db: DatabaseService) {}
  async create(createWordDto: CreateWordDto) {
    const { word, mean, example, romaji } = createWordDto;
    try {
      const result = await this.db.execute(
        `
      INSERT INTO words (word, mean, romaji,example)
      VALUES (?, ?,?, ?)
      `,
        [word, mean, romaji, example],
      );

      return {
        id: result.insertId,
        word,
        mean,
        romaji,
        example,
      };
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException('新增失敗');
    }
  }

  async findAll() {
    const rows = await this.db.query(
      `
      SELECT *
      FROM words
      `,
    );

    return rows;
  }

  findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  async remove(ids: number[]) {
    if (!ids.length) {
      throw new BadRequestException('請提供要刪除的 id');
    }
    console.log('ids:', ids);
    console.log('ids[0]:', ids[0]);
    try {
      const placeholders = ids.map(() => '?').join(',');
      const result = await this.db.execute(
        `DELETE FROM words WHERE id IN (${placeholders})`,
        ids,
      );
      console.log('delete result', result);
      if (result.affectedRows === 0) {
        throw new NotFoundException('找不到要刪除的資料');
      }
      return {
        success: true,
        message: '刪除成功',
        count: result.affectedRows,
      };
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException('刪除失敗');
    }
  }
}
