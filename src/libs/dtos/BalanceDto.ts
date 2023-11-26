import { BaseEntity } from './Common';
import { Currency } from './CurrencyDto';

export interface Balance extends BaseEntity {
  ownerId: string;
  currency?: Currency;
  currencyId: string;
  amount: number;
}

export interface CreateBalanceDto {
  amount: number;
}
