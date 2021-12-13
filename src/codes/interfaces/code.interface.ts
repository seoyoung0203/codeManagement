import { CodeInfo } from 'src/entity/codeInfo';

export interface ChildCodesInfo {
  id: number;
  code: string;
  name: string;
  myDepth: number;
  sortNum: number;
}

export interface ParentsCodesInfo {
  id: number;
  code: string;
  name: string;
  myDepth: number;
  sortNum: number;
  parentsCodeInfo: CodeInfo;
}
