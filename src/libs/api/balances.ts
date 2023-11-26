import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { queryGet } from './fetch';
import { Balance } from '../dtos';
import { CurrencyCode } from '../enums';

export const useBalances = () => {
  return useQuery<Balance[], AxiosError>(['balances'], queryGet('/balances'));
};

export const useTotalBalance = (currencyCode: CurrencyCode) => {
  return useQuery<number, AxiosError>(
    ['balances', 'total-amount', currencyCode],
    queryGet(`/balances/total-amount/${currencyCode}`),
  );
};
