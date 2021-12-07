import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodesController } from './codes/codes.controller';
import { CodesService } from './codes/codes.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [CodesController],
  providers: [CodesService],
})
export class AppModule {}
