import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CodeInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, unique: true })
  code: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('int')
  myDepth: number;

  @Column('varchar', { length: 50, nullable: true })
  preDepthCode: string;

  @Column('int')
  sortNum: number;
}
