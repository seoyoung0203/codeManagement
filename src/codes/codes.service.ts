import { Injectable } from '@nestjs/common';
import { CodeInfo } from '../entity/CodeInfo';
import { getConnection } from 'typeorm';
import { Code } from './code.interface';

@Injectable()
export class CodesService {
  async create(codes: Code) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CodeInfo)
      .values([codes])
      .execute();
  }

  async update(id: number, updatedData: Code) {
    await getConnection()
      .createQueryBuilder()
      .update(CodeInfo)
      .set(updatedData)
      .where('id = :id', { id })
      .execute();
  }
}
