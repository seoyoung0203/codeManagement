import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
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
    if (createCodeDto.parentsCodeInfo) {
      const inputParentsCode = await this.codesService.getMyCodeInfoByCodeOrId(
        null,
        createCodeDto.parentsCodeInfo.id,
      );
      if (!inputParentsCode)
        throw new NotFoundException('부모 코드가 존재하지 않습니다');
    }
    await this.codesService.createCode(createCodeDto);
    res.status(HttpStatus.CREATED).send('생성 완료');
  }

  // 부모(최상위까지) 코드 가져오기
  @Get('/:code/parentscodes')
  async getParentCode(@Res() res: Response, @Param('code') code: string) {
    const parentsCodes = await this.codesService.getParentsCodesInfo(code);
    res.status(HttpStatus.OK).json({ result: parentsCodes });
  }

  // 자식 코드 가져오기
  @Get('/:code/childcodes')
  async getChildCode(@Res() res: Response, @Param('code') code: string) {
    const childCodes = await this.codesService.getChildCodesInfo(code);
    res.status(HttpStatus.OK).json({ result: childCodes });
  }

  @Patch(':id')
  async update(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCodeData: UpdateCodeDto,
  ) {
    const codeInfo = await this.codesService.getMyCodeInfoByCodeOrId(null, id);
    if (!codeInfo) throw new NotFoundException();

    await this.codesService.update(id, updateCodeData);
    res.status(HttpStatus.OK).send('업데이트 완료');
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const codeInfo = await this.codesService.getMyCodeInfoByCodeOrId(null, id);
    if (!codeInfo) throw new NotFoundException();

    await this.codesService.deleteCode(id);
    res.status(HttpStatus.OK).send('삭제 완료');
  }
}
