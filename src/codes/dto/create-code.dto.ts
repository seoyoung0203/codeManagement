import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CodeInfo } from 'src/entity/codeInfo';

export class CreateCodeDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  myDepth: number;

  @IsOptional()
  parentsCodeInfo?: CodeInfo;

  @IsNumber()
  sortNum: number;
}
