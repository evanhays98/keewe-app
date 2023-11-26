import classnames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../theme';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  blockColor: {
    background: theme.colors.blue,
    minWidth: theme.marginBase * 10,
    borderRadius: theme.borderRadius.std,
    ...theme.fonts.label,
    color: theme.colors.background,
    fontWeight: 'bold',
    display: 'flex',
    border: 0,
    cursor: 'pointer',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    padding: [theme.marginBase + theme.marginBase / 2, theme.marginBase * 2],
    gap: theme.marginBase,
    transition: 'all 0.3s ease',
    '&:hover': {
      background: theme.colors.blueHover,
    },
  },
  full: {
    width: '100%',
  },
  line: {
    ...theme.fonts.caption2,
    background: 'transparent',
    textDecoration: 'underline',
    color: theme.colors.black,
    '&:hover': {
      background: 'transparent',
    },
  },
}));

interface BaseButtonProps {
  className?: string;
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  iconClassName?: string;
  type?: 'button' | 'submit' | 'reset';
  full?: boolean;
  line?: boolean;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type GenericButtonProps = ButtonProps;

export const Button = (props: BaseButtonProps & GenericButtonProps) => {
  const {
    color,
    className,
    onClick,
    type,
    iconClassName,
    full,
    line,
    ...rest
  } = props;
  const classes = useStyles({
    theme,
  });

  return (
    <button
      className={classnames(
        classes.blockColor,
        {
          [classes.full]: props.full,
          [classes.line]: props.line,
        },
        className,
      )}
      onClick={onClick}
      onSubmit={onClick}
      type={type}
      {...rest}
    >
      {props.children}
      {props.text && props.text}
    </button>
  );
};
