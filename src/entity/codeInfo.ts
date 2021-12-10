import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('codeInfo')
export class CodeInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, unique: true })
  code: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('int')
  myDepth: number;

  @ManyToOne(() => CodeInfo, (codeInfo) => codeInfo.childCodeInfo)
  parentsCodeInfo: CodeInfo;

  @OneToMany(() => CodeInfo, (codeInfo) => codeInfo.parentsCodeInfo)
  childCodeInfo: CodeInfo[];

  @Column('int')
  sortNum: number;
}
