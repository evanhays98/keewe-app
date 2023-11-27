import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { Button, Formix, FormixError, Input, PageHeader, SelectFormik, useToast } from '../../libs/core';
import * as Yup from 'yup';
import { useCreatePayment, useCurrencies, useUsers } from '../../libs/api';
import { FormikHelpers } from 'formik';
import { AxiosError } from 'axios';
import { CreatePaymentDto, User } from '../../libs/dtos';
import { Currency } from '../../libs/dtos/CurrencyDto';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    paddingBottom: theme.marginBase * 6,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: theme.marginBase * 4,
    padding: theme.marginBase * 2,
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.boxWidth.tiny,
  },
}));

interface Values {
  recipient?: User;
  currency?: Currency;
  amount: number;
  error?: string;
}

const validationSchema = Yup.object().shape({
  recipient: Yup.object().required('Field is required'),
  currency: Yup.object().required('Field is required'),
  amount: Yup.number()
    .min(1, 'Amount must be greater than 0')
    .required('Field is required'),
});

const initialValues: Values = {
  recipient: undefined,
  currency: undefined,
  amount: 0,
  error: '',
};

export const Payments = () => {
  const classes = useStyles({ theme });
  const { data: users } = useUsers();
  const { data: currencies } = useCurrencies();
  const { mutateAsync: payment } = useCreatePayment();
  const toast = useToast();

  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const userOptions = useMemo(() => {
    if (!users) return [];
    return users.map((user) => ({
      value: user,
      label: user.username,
    }));
  }, [users]);

  const currencyOptions = useMemo(() => {
    if (!currencies) return [];
    return currencies.map((currency) => ({
      value: currency,
      label: currency.name,
    }));
  }, [currencies]);

  const submit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      if (!values.recipient || !values.currency) return;
      const paymentValues: CreatePaymentDto = {
        recipientId: values.recipient?.id,
        currencyId: values.currency?.id,
        amount: Number(values.amount),
      };
      await payment(paymentValues);
      helpers.resetForm();
      setReset(true);
      toast.saved(
        `Payment of ${values.amount}${values.currency.symbol} was sent to "${values.recipient.username}"`,
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        helpers.setErrors({
          error: e.response?.data?.message || 'Une erreur s\'est produite',
        });
      }
      throw e;
    }
  };

  return (
    <div className={classes.globalContainer}>
      <PageHeader text='Payments'></PageHeader>
      <div className={classes.container}>
        <Formix
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          <SelectFormik
            name='recipient'
            options={userOptions}
            label='Recipient'
            reset={reset}
          />
          <SelectFormik
            name='currency'
            options={currencyOptions}
            label='Currency'
            reset={reset}
          />
          <Input title='Amount' name='amount' type='number' reset={reset} />
          <FormixError />
          <Button text='Send' type='submit' full />
        </Formix>
      </div>
    </div>
  );
};
