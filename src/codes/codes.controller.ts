import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Code } from './code.interface';
import { CodesService } from './codes.service';

@Controller('codes')
export class CodesController {
  constructor(private codesService: CodesService) {}
  @Post()
  async createCode(@Res() res: Response, @Body() createCodeData: Code) {
    await this.codesService.create(createCodeData);
    res.status(HttpStatus.CREATED).send('생성 완료');
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
  async update(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() updateCodeData: Code,
  ) {
    await this.codesService.update(id, updateCodeData);
    res.status(HttpStatus.OK).send('업데이트 완료');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'remove code';
  }
}
