import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mysql, { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = mysql.createPool({
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),

      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    this.testConnection();
  }
  // SELECT 使用
  async query<T extends RowDataPacket[]>(
    sql: string,
    params?: any[],
  ): Promise<T> {
    const [rows] = await this.pool.query<T>(sql, params);

    return rows;
  }

  // INSERT / UPDATE / DELETE 使用
  async execute(sql: string, params?: any[]): Promise<ResultSetHeader> {
    const [result] = await this.pool.execute<ResultSetHeader>(sql, params);

    return result;
  }
  async testConnection() {
    try {
      const connection = await this.pool.getConnection();

      console.log('✅ MySQL 連線成功！');

      connection.release();
    } catch (error) {
      console.error('❌ MySQL 連線失敗');
      console.error(error);
    }
  }
  async onModuleDestroy() {
    await this.pool.end();
  }
}
