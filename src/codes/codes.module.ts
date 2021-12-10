import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeInfo } from '../entity/codeInfo';
import { CodesController } from './codes.controller';
import { CodesService } from './codes.service';

@Module({
  imports: [TypeOrmModule.forFeature([CodeInfo])],
  controllers: [CodesController],
  providers: [CodesService],
})
export class CodesModule {}
