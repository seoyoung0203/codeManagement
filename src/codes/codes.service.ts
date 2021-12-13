import { Injectable } from '@nestjs/common';
import { CodeInfo } from '../entity/CodeInfo';
import { Repository } from 'typeorm';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildCodesInfo, ParentsCodes } from './interfaces/code.interface';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(CodeInfo)
    private codeInfoRepository: Repository<CodeInfo>,
  ) {}

  async createCodes(code: CreateCodeDto) {
    await this.codeInfoRepository.save(code);
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
    if (!mycode) {
      throw new Error(`'${code}' code is undifined`);
    }
    const { myDepth } = mycode;
    const query = this.codeInfoRepository.createQueryBuilder('codeInfo');

    if (myDepth > 1) {
      for (let i = 1; i < myDepth; i++) {
        const joinTable =
          i == 1
            ? `codeInfo.parentsCodeInfo`
            : `parents${i - 1}.parentsCodeInfo`;
        query.leftJoinAndSelect(joinTable, `parents${i}`);
      }
    }

    const parentsCodes = await query
      .where('codeInfo.code = :code', { code })
      .getOne();

    return parentsCodes;
  }

  async getChildCodesInfo(code: string): Promise<ChildCodesInfo[]> {
    const mycode = await this.getMyCodeInfoByCodeOrId(code);

    if (!mycode) {
      throw new Error(`'${code}' code is undifined`);
    }

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
