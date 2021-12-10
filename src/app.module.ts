import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesModule } from './codes/codes.module';
import { CodeInfo } from './entity/codeInfo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'codeInfoManagement',
      entities: [CodeInfo],
      synchronize: true,
    }),
    CodesModule,
  ],
})
export class AppModule {}
