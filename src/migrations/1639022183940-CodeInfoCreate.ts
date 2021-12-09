import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';

export class CodeInfoCreate1639022183940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = fs.readFileSync(`${__dirname}/createCodeInfo.sql`, 'utf-8');
    console.log(query);
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE codeInfo`);
  }
}
