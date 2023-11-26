import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CreateCurrencyConversionDto, CurrencyConversion } from '../dtos';
import { queryCreate, queryGet } from './fetch';
import { AxiosError } from 'axios';

export const useCreateConversion = () => {
  const queryClient = useQueryClient();
  return useMutation<
    CurrencyConversion,
    undefined,
    CreateCurrencyConversionDto
  >(queryCreate(`/currency-conversions`), {
    onSuccess: async (data) => {
      queryClient.setQueryData(['currency-conversions', data.id], data);
      await queryClient.invalidateQueries(['currency-conversions']);
    },
  });
};

export const useConversionsHistory = () => {
  return useQuery<CurrencyConversion[], AxiosError>(
    ['currency-conversions', 'history'],
    queryGet(`/currency-conversions/history`),
  );
};
