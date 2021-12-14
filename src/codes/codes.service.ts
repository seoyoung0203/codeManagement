import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CodeInfo } from '../entity/CodeInfo';
import { Repository } from 'typeorm';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildCodes, ParentsCodes } from './interfaces';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(CodeInfo)
    private codeInfoRepository: Repository<CodeInfo>,
  ) {}

  async createCode(createCodeDto: CreateCodeDto) {
    if (await this.getMyCodeInfoByCodeOrId(createCodeDto.code, null))
      throw new BadRequestException('중복된 코드입니다');
    await this.codeInfoRepository.save(createCodeDto);
  }

  async getMyCodeInfoByCodeOrId(
    code?: string,
    id?: number,
  ): Promise<{ id: number; myDepth: number }> {
    const codeInfo = await this.codeInfoRepository.findOne({
      select: ['id', 'myDepth'],
      where: code ? { code } : { id },
    });

    return codeInfo;
  }

  async getParentsCodesInfo(code: string): Promise<ParentsCodes> {
    const mycode = await this.getMyCodeInfoByCodeOrId(code);
    if (!mycode) throw new NotFoundException();
    const { myDepth } = mycode;
    const query = this.codeInfoRepository
      .createQueryBuilder('codeInfo')
      .select(['codeInfo.id', 'codeInfo.code', 'codeInfo.name']);

    if (myDepth > 1) {
      for (let i = 1; i < myDepth; i++) {
        const joinTable =
          i == 1
            ? `codeInfo.parentsCodeInfo`
            : `parents${i - 1}.parentsCodeInfo`;
        query
          .leftJoinAndSelect(joinTable, `parents${i}`)
          .addSelect([
            `parents${i}.id`,
            `parents${i}.code`,
            `parents${i}.name`,
            `parents${i}.myDepth`,
            `parents${i}.sortNum`,
          ]);
      }
    }

    const parentsCodes = await query
      .where('codeInfo.code = :code', { code })
      .getOne();

    return parentsCodes;
  }

  async getChildCodesInfo(code: string): Promise<ChildCodes[]> {
    const mycode = await this.getMyCodeInfoByCodeOrId(code);
    if (!mycode) throw new NotFoundException();

    const childCodes = await this.codeInfoRepository
      .createQueryBuilder('codeInfo')
      .select([
        'codeInfo.id',
        'codeInfo.code',
        'codeInfo.name',
        'codeInfo.myDepth',
        'codeInfo.sortNum',
      ])
      .where('codeInfo.parentsCodeInfoId = :parentsCodeInfoId', {
        parentsCodeInfoId: mycode.id,
      })
      .orderBy('codeInfo.sortNum')
      .getMany();

    return childCodes;
  }

  async update(id: number, updatedData: UpdateCodeDto) {
    await this.codeInfoRepository
      .createQueryBuilder()
      .update()
      .set(updatedData)
      .where('id = :id', { id })
      .execute();
  }

  async deleteCode(id: number) {
    await this.codeInfoRepository.delete(id);
  }
}
