import { Injectable } from '@nestjs/common';
import { CodeInfo } from '../entity/CodeInfo';
import { Repository } from 'typeorm';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(CodeInfo)
    private codeInfoRepository: Repository<CodeInfo>,
  ) {}

  async createCodes(code: CreateCodeDto): Promise<void> {
    this.codeInfoRepository.save(code);
  }

  async getMyCodeInfoByCodeOrId(
    require: { code: string } | { id: number },
  ): Promise<CodeInfo> {
    const codeInfo = await this.codeInfoRepository.findOne({
      where: require,
    });

    return codeInfo;
  }

  async getParentsCodesInfo(code: string) {
    const mycode = await this.getMyCodeInfoByCodeOrId({ code });
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

  async getChildsCodesInfo(code: string) {
    const mycode = await this.getMyCodeInfoByCodeOrId({ code });

    if (!mycode) {
      throw new Error(`'${code}' code is undifined`);
    }

    const childCodes = await this.codeInfoRepository
      .createQueryBuilder('codeInfo')
      .where('codeInfo.parentsCodeInfoId = :parentsCodeInfoId', {
        parentsCodeInfoId: mycode.id,
      })
      .orderBy('codeInfo.sortNum')
      .getMany();

    return childCodes;
  }

  async update(id: number, updatedData: UpdateCodeDto): Promise<void> {
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
