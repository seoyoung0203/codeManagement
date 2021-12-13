import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCodeDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  myDepth: number;

  @IsOptional()
  parentsCodeInfo?: { id: number };

  @IsNumber()
  sortNum: number;
}
