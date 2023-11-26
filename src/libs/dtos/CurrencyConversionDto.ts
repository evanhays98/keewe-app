import { BaseEntity } from './Common';
import { Status } from '../enums';

export interface CurrencyConversion extends BaseEntity {
  ownerId: string;
  fromCurrencyId: string;
  toCurrencyId: string;
  amount: number;
  rate: number;
  status: Status;
}

export interface CreateCurrencyConversionDto {
  fromCurrencyId: string;
  toCurrencyId: string;
  amount: number;
}
