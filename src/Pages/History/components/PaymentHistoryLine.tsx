import React, { useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { ColorsString, Theme, theme } from 'src/libs/theme';
import { Payment } from '../../../libs/dtos';
import { useCurrency, useMe, useUser } from '../../../libs/api';
import { Icon, Icons } from '../../../libs/core';
import classnames from 'classnames';
import { Status } from '../../../libs/enums';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'min-content min-content 1fr min-content min-content',
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
    justifySelf: 'flex-start',
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
  payment: Payment;
}

export const PaymentHistoryLine = ({ payment }: Props) => {
  const classes = useStyles({ theme });
  const { data: currency } = useCurrency(payment.currencyId);
  const { data: me } = useMe();
  const { data: recipient } = useUser(payment.recipientId);
  const { data: sender } = useUser(payment.senderId);

  const isRecipient = useMemo(() => {
    return me?.id === payment.recipientId;
  }, [me, payment]);

  if (!currency || !me || !recipient || !sender) {
    return null;
  }

  return (
    <div className={classes.container}>
      <p className={classnames(classes.label, classes.icon)}>
        {isRecipient ? (
          <Icons icon={Icon.receive} color={ColorsString.green} />
        ) : (
          <Icons icon={Icon.send} color={ColorsString.red} />
        )}
      </p>
      <p className={classes.label}>{`${payment.amount.toFixed(2)} ${
        currency.code
      }`}</p>
      <p className={classes.label}>{`${
        me.id === payment.recipientId ? sender.username : recipient.username
      }`}</p>
      <p className={classes.label}>
        {new Date(payment.createdAt).toLocaleDateString('fr-FR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      {payment.status === Status.SUCCESS && (
        <Icons icon={Icon.success} color={ColorsString.green} />
      )}
      {payment.status === Status.PENDING && (
        <Icons icon={Icon.load} color={ColorsString.midNightBlue} />
      )}
      {payment.status === Status.FAILED && (
        <Icons icon={Icon.fail} color={ColorsString.red} />
      )}
    </div>
  );
};
