import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CreatePaymentDto, Payment } from '../dtos';
import { queryCreate, queryGet } from './fetch';
import { AxiosError } from 'axios';

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation<Payment, undefined, CreatePaymentDto>(
    queryCreate(`/payments`),
    {
      onSuccess: async (data) => {
        queryClient.setQueryData(['payments', data.id], data);
        await queryClient.invalidateQueries(['payments']);
      },
    },
  );
};

export const usePaymentsHistory = () => {
  return useQuery<Payment[], AxiosError>(
    ['payments', 'history'],
    queryGet(`/payments/history`),
  );
};
