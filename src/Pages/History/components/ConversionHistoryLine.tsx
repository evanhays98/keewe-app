import React from 'react';
import { createUseStyles } from 'react-jss';
import { ColorsString, Theme, theme } from 'src/libs/theme';
import { CurrencyConversion } from '../../../libs/dtos';
import { useCurrency } from '../../../libs/api';
import { Icon, Icons } from '../../../libs/core';
import classnames from 'classnames';
import { Status } from '../../../libs/enums';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'min-content 1fr min-content min-content',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.marginBase * 3,
    padding: theme.marginBase,
    border: `1px solid ${theme.colors.blue}90`,
    borderRadius: theme.borderRadius.std,

    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
    },
  },
  amountContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  icon: {
    height: 16,
    width: 16,
  },
  inline: {
    ...theme.fonts.label,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.marginBase,
  },
  label: {
    ...theme.fonts.label,
    whiteSpace: 'nowrap',
  },
  caption: {
    ...theme.fonts.caption,
  },
}));

interface Props {
  currencyConversion: CurrencyConversion;
}

export const ConversionHistoryLine = ({ currencyConversion }: Props) => {
  const classes = useStyles({ theme });
  const { data: fromCurrency } = useCurrency(currencyConversion.fromCurrencyId);
  const { data: toCurrency } = useCurrency(currencyConversion.toCurrencyId);

  if (!fromCurrency || !toCurrency) {
    return null;
  }

  return (
    <div className={classes.container}>
      <p className={classnames(classes.label)}>
        <Icons icon={Icon.exchange} color={ColorsString.midNightBlue} />
      </p>
      <div className={classes.inline}>
        <p>
          {`${currencyConversion.amount.toFixed(2)} ${
            fromCurrency.code
          }`}
        </p>
        <Icons icon={Icon.send} color={ColorsString.midNightBlue} size={13} className={classes.icon} />
        <p>
          {`${(currencyConversion.amount * currencyConversion.rate).toFixed(
            2,
          )} ${toCurrency.code}`}
        </p>
      </div>
      <p className={classes.label}>
        {new Date(currencyConversion.createdAt).toLocaleDateString('fr-FR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      {currencyConversion.status === Status.SUCCESS && (
        <Icons icon={Icon.success} color={ColorsString.green} />
      )}
      {currencyConversion.status === Status.PENDING && (
        <Icons icon={Icon.load} color={ColorsString.midNightBlue} />
      )}
      {currencyConversion.status === Status.FAILED && (
        <Icons icon={Icon.fail} color={ColorsString.red} />
      )}
    </div>
  );
};
