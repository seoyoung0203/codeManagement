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
    try {
      await this.codesService.createCodes(createCodeDto);
      res.status(HttpStatus.CREATED).send('생성 완료');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  // 부모(최상위까지) 코드 가져오기
  @Get('/parents/:code')
  async getParentCode(@Res() res: Response, @Param('code') code: string) {
    try {
      const parentsCodes = await this.codesService.getParentsCodesInfo(code);
      res.status(HttpStatus.OK).send(parentsCodes);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  // 자식 코드 가져오기
  @Get('/child/:code')
  async getChildCode(@Res() res: Response, @Param('code') code: string) {
    try {
      const childCode = await this.codesService.getChildsCodesInfo(code);
      res.status(HttpStatus.OK).send(childCode);
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCodeData: UpdateCodeDto,
  ) {
    try {
      const codeInfo = await this.codesService.getMyCodeInfoByCodeOrId({ id });
      if (!codeInfo) return res.status(500).send('No Update Data');

      await this.codesService.update(id, updateCodeData);
      res.status(HttpStatus.OK).send('업데이트 완료');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    try {
      const codeInfo = await this.codesService.getMyCodeInfoByCodeOrId({ id });
      if (!codeInfo) return res.status(500).send('No Delete Data');

      await this.codesService.deleteCode(id);
      res.status(HttpStatus.OK).send('삭제 완료');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
}
