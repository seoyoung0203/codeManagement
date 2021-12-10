import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CodesService } from './codes.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';

@Controller('codes')
export class CodesController {
  constructor(private codesService: CodesService) {}
  @Post()
  async createCode(@Res() res: Response, @Body() createCodeDto: CreateCodeDto) {
    await this.codesService.createCodes(createCodeDto);
    res.status(HttpStatus.CREATED).send('생성 완료');
  }

  // 부모(최상위까지) 코드 가져오기
  @Get('/parents/:code')
  async getParentCode(@Res() res: Response, @Param('code') code: string) {
    const parentsCodes = await this.codesService.getParentsCodesInfo(code);
    res.status(HttpStatus.OK).send(parentsCodes);
  }

  // 자식 코드 가져오기
  @Get('/child/:code')
  async getChildCode(@Res() res: Response, @Param('code') code: string) {
    const childCode = await this.codesService.getChildsCodesInfo(code);
    res.status(HttpStatus.OK).send(childCode);
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCodeData: UpdateCodeDto,
  ) {
    await this.codesService.update(id, updateCodeData);
    res.status(HttpStatus.OK).send('업데이트 완료');
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    await this.codesService.deleteCode(id);
    res.status(HttpStatus.OK).send('삭제 완료');
  }
}
