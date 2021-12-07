import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Code } from './code.interface';
import { CodesService } from './codes.service';

@Controller('codes')
export class CodesController {
  constructor(private codesService: CodesService) {}
  @Post()
  createCode(@Body() createCodeData: Code) {
    this.codesService.create(createCodeData);
  }

  // 부모(1개까지) 코드 가져오기
  @Get('/parents/:id')
  getParentCode(@Param('id') id: string): string {
    return 'get parents code';
  }

  // 자식(마지막 depth까지) 코드 가져오기
  @Get('/child/:id')
  getChildCode(@Param('id') id: string): string {
    return 'get child code';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCodeData: Code): string {
    return 'update code';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'remove code';
  }
}
