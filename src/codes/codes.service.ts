import { Injectable } from '@nestjs/common';
import { CodeInfo } from '../entity/CodeInfo';
import { getConnection, getManager, Repository } from 'typeorm';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(CodeInfo)
    private codeInfoRepository: Repository<CodeInfo>,
  ) {}
  async createCodes(code: CreateCodeDto) {
    this.codeInfoRepository.save(code);
  }

  async getMyDepth(code: string) {
    const entityManager = getManager();
    const depth = await entityManager.query(`
      select myDepth from code_info where code = "${code}";
    `);
    return depth[0];
  }

  async getChildsCodeInfo(code: string) {
    const entityManager = getManager();
    const data = await entityManager.query(
      `
      select 
        my.code as myCodey, 
        my.name as myCodeName,
        child.code as childCode, 
        child.name as childCodeName
      from code_info as my 
      inner join code_info as child on my.preDepthCode = child.code 
      where my.code = ?
      order by child.sortNum, my.sortNum;
    `,
      [code],
    );
    return data;
  }

  async update(id: number, updatedData: UpdateCodeDto) {
    await getConnection()
      .createQueryBuilder()
      .update(CodeInfo)
      .set(updatedData)
      .where('id = :id', { id })
      .execute();
  }

  async deleteCode(id: number) {
    await this.codeInfoRepository.delete(id);
  }
}
