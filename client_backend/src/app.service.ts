import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../src/database/database.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
