import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { queryGet } from './fetch';
import { Currency } from '../dtos/CurrencyDto';

export const useCurrencies = () => {
  return useQuery<Currency[], AxiosError>(['currency'], queryGet('/currency'));
};

export const useCurrency = (id: string) => {
  return useQuery<Currency, AxiosError>(
    ['currency', id],
    queryGet(`/currency/${id}`),
    {
      enabled: !!id,
    },
  );
};
