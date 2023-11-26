import { BaseEntity } from './Common';
import { Status } from '../enums';

export interface Payment extends BaseEntity {
  senderId: string;
  recipientId: string;
  currencyId: string;
  amount: number;
  status: Status;
}

export interface CreatePaymentDto {
  recipientId: string;
  currencyId: string;
  amount: number;
}
