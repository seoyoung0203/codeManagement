import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesController } from './codes/codes.controller';
import { CodesService } from './codes/codes.service';
import { CodeInfo } from './entity/CodeInfo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [CodeInfo],
      synchronize: false,
    }),
  ],
  controllers: [CodesController],
  providers: [CodesService],
})
export class AppModule {}
