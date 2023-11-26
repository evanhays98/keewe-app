import { CurrencyCode } from '../enums';
import { BaseEntity } from './Common';

export interface Currency extends BaseEntity {
  active: boolean;
  code: CurrencyCode;
  name: string;
  symbol: string;
  rates: Record<CurrencyCode, number>;
}
