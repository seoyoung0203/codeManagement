import { CodeInfo } from 'src/entity/codeInfo';

export default interface ParentsCodes {
  id: number;
  code: string;
  name: string;
  parentsCodeInfo: CodeInfo;
}
