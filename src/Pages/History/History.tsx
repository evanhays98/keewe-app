import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { useConversionsHistory, usePaymentsHistory } from '../../libs/api';
import { CenteredLoader, PageHeader } from '../../libs/core';
import { PaymentHistoryLine } from './components/PaymentHistoryLine';
import { CurrencyConversion, Payment } from '../../libs/dtos';
import { ConversionHistoryLine } from './components/ConversionHistoryLine';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  globalContainer: {
    minHeight: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    paddingBottom: theme.marginBase * 6,
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: theme.marginBase * 2,
    padding: theme.marginBase * 2,
    flexDirection: 'column',
    paddingBottom: theme.marginBase * 6,
    maxWidth: '100%',

    '@media (max-width: 768px)': {
      width: '100%',
    },
  },
  balanceTitle: {
    ...theme.fonts.h3,
    color: theme.colors.black,
  },
  balanceContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: theme.marginBase,
    flexDirection: 'column',
  },
  balance: {
    ...theme.fonts.h4,
    fontWeight: 500,
  },
  logOut: {
    ...theme.fonts.label,
    color: theme.colors.red,
    textDecoration: 'none',
  },
}));

interface Transaction {
  history: Payment | CurrencyConversion;
  date: Date;
  type: 'PAYMENT' | 'CURRENCY_CONVERSION';
}

export const History = () => {
  const classes = useStyles({ theme });
  const { data: paymentHistory, isLoading } = usePaymentsHistory();
  const { data: conversionHistory, isLoading: isLoadingConversion } =
    useConversionsHistory();

  const transaction = useMemo(() => {
    const transactions: Transaction[] = [];

    paymentHistory?.forEach((payment) => {
      transactions.push({
        history: payment,
        date: new Date(payment.createdAt),
        type: 'PAYMENT',
      });
    });

    conversionHistory?.forEach((conversion) => {
      transactions.push({
        history: conversion,
        date: new Date(conversion.createdAt),
        type: 'CURRENCY_CONVERSION',
      });
    });

    return transactions.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }, [paymentHistory, conversionHistory]);

  if (isLoading || isLoadingConversion) {
    return <CenteredLoader />;
  }

  return (
    <div className={classes.globalContainer}>
      <PageHeader text="History" />
      <div className={classes.container}>
        {transaction?.map(({ history, type }) => (
          <>
            {type === 'PAYMENT' && (
              <PaymentHistoryLine payment={history as Payment} />
            )}
            {type === 'CURRENCY_CONVERSION' && (
              <ConversionHistoryLine
                currencyConversion={history as CurrencyConversion}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};
