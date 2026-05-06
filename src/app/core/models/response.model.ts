import {Meta} from './meta.model';

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T | null;
  meta: Meta;
}
