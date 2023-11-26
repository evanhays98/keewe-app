import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { useBalances } from '../../../libs/api';
import { BalanceLine } from './BalanceLine';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  balanceContainer: {
    display: 'flex',
    gap: theme.marginBase,
    flexDirection: 'column',
  },
  balanceTitle: {
    ...theme.fonts.h3,
    color: theme.colors.black,
  },
}));

export const BalanceCurrency = () => {
  const classes = useStyles({ theme });
  const { data: balances } = useBalances();
  if (!balances || !balances.length) {
    return null;
  }

  return (
    <div className={classes.balanceContainer}>
      <h2 className={classes.balanceTitle}>Your balances by currency</h2>
      {balances?.map((balance) => <BalanceLine balance={balance} />)}
    </div>
  );
};
