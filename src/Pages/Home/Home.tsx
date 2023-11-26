import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import { useLogout, useTotalBalance } from '../../libs/api';
import { CurrencyCode } from '../../libs/enums';
import { Button, CenteredLoader, PageHeader } from '../../libs/core';
import { BalanceCurrency } from './component/BalancesCurrency';

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
    paddingBottom: theme.marginBase * 6,
    width: '100%',
    maxWidth: theme.boxWidth.large,
    margin: '0 auto',
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

export const Home = () => {
  const classes = useStyles({ theme });
  const { data: totalBalance, isLoading } = useTotalBalance(CurrencyCode.EUR);
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return <CenteredLoader />;
  }

  return (
    <div className={classes.globalContainer}>
      <PageHeader text="Keewe">
        <Button
          line
          text="log out"
          className={classes.logOut}
          onClick={logout}
        />
      </PageHeader>
      <div className={classes.container}>
        <div className={classes.balanceContainer}>
          <h2 className={classes.balanceTitle}>Your balance</h2>
          <p className={classes.balance}>{`${
            totalBalance ? totalBalance.toFixed(2) : 0
          } €`}</p>
        </div>
        <BalanceCurrency />
      </div>
    </div>
  );
};
