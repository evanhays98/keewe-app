import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import {
  Button,
  Formix,
  FormixError,
  Input,
  PageHeader,
  SelectFormik,
  useToast,
} from '../../libs/core';
import * as Yup from 'yup';
import { useCreateConversion, useCurrencies } from '../../libs/api';
import { FormikHelpers } from 'formik';
import { AxiosError } from 'axios';
import { CreateCurrencyConversionDto } from '../../libs/dtos';
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
  fromCurrency?: Currency;
  toCurrency?: Currency;
  amount: number;
  error?: string;
}

const validationSchema = Yup.object().shape({
  fromCurrency: Yup.object().required('Field is required'),
  toCurrency: Yup.object()
    .required('Field is required')
    .test(
      'notSame',
      'from Currency and to Currency should not be the same',
      function (value) {
        const { fromCurrency } = this.parent;
        return fromCurrency?.id !== value?.id;
      },
    ),
  amount: Yup.number()
    .min(1, 'Amount must be greater than 0')
    .required('Field is required'),
});

const initialValues: Values = {
  fromCurrency: undefined,
  toCurrency: undefined,
  amount: 0,
  error: '',
};

export const Conversions = () => {
  const classes = useStyles({ theme });
  const { data: currencies } = useCurrencies();
  const { mutateAsync: convert } = useCreateConversion();
  const toast = useToast();

  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  const currencyOptions = useMemo(() => {
    if (!currencies) return [];
    return currencies.map((currency) => ({
      value: currency,
      label: currency.name,
    }));
  }, [currencies]);

  const submit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      if (!values.fromCurrency || !values.toCurrency) return;
      const convertValues: CreateCurrencyConversionDto = {
        fromCurrencyId: values.fromCurrency?.id,
        toCurrencyId: values.toCurrency?.id,
        amount: Number(values.amount),
      };
      const conversion = await convert(convertValues);
      helpers.resetForm();
      setReset(true);
      toast.saved(
        `Successfully converted ${values.amount}${values.fromCurrency
          ?.symbol} to ${(conversion.amount * conversion.rate).toFixed(
          2,
        )}${values.toCurrency?.symbol}.`,
      );
    } catch (e) {
      if (e instanceof AxiosError) {
        helpers.setErrors({
          error: e.response?.data?.message || "Une erreur s'est produite",
        });
      }
      throw e;
    }
  };

  return (
    <div className={classes.globalContainer}>
      <PageHeader text="Conversions"></PageHeader>
      <div className={classes.container}>
        <Formix
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submit}
        >
          <SelectFormik
            name="fromCurrency"
            options={currencyOptions}
            label="From Currency"
            reset={reset}
          />
          <SelectFormik
            name="toCurrency"
            options={currencyOptions}
            label="To Currency"
            reset={reset}
          />
          <Input title="Amount" name="amount" type="number" reset={reset} />
          <FormixError />
          <Button text="Send" type="submit" full />
        </Formix>
      </div>
    </div>
  );
};
