import { Injectable } from '@nestjs/common';
import { CodeInfo } from '../entity/CodeInfo';
import { getConnection } from 'typeorm';
import { CreateCode, UpdateCode } from './code.interface';

@Injectable()
export class CodesService {
  async create(codes: CreateCode) {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CodeInfo)
      .values([codes])
      .execute();
  }

  async update(id: number, updatedData: UpdateCode) {
    await getConnection()
      .createQueryBuilder()
      .update(CodeInfo)
      .set(updatedData)
      .where('id = :id', { id })
      .execute();
  }

  async delete(id: number) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CodeInfo)
      .where('id = :id', { id })
      .execute();
  }
}
