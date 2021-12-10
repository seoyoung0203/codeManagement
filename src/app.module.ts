import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesModule } from './codes/codes.module';

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
      entities: [__dirname + '/entity/*.js'],
      synchronize: false,
    }),
    CodesModule,
  ],
})
export class AppModule {}
