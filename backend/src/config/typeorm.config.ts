import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: 5432,
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASS'),
  database: configService.get<string>('DATABASE_NAME'),
  synchronize: true,
  entities: ['**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;
