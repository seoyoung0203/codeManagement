import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CodeInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;
}
