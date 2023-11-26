import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { Balance } from '../../../libs/dtos';
import { CurrencyCode } from '../../../libs/enums';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: theme.marginBase * 3,
    padding: theme.marginBase,
    border: `1px solid ${theme.colors.blue}90`,
    borderRadius: theme.borderRadius.std,
  },
  amountContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  label: {
    ...theme.fonts.label,
  },
  caption: {
    ...theme.fonts.caption,
  },
}));

interface Props {
  balance: Balance;
}

export const BalanceLine = ({ balance }: Props) => {
  const classes = useStyles({ theme });
  const balanceInEur = (
    balance.amount * (balance?.currency?.rates[CurrencyCode.EUR] || 1)
  ).toFixed(2);

  if (!balance.currency) {
    return null;
  }

  return (
    <div className={classes.container}>
      <p className={classes.label}>{balance.currency.name}</p>
      <p className={classes.label}>{balance.currency.code}</p>
      <div className={classes.amountContainer}>
        <p className={classes.label}>{`${Number(balance.amount).toFixed(2)} ${
          balance.currency.symbol
        }`}</p>
        {balance.currency.code !== CurrencyCode.EUR && (
          <p className={classes.caption}>{balanceInEur} €</p>
        )}
      </div>
    </div>
  );
};
