import React from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from '../theme';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  titleContainer: {
    width: '100%',
    boxShadow: theme.boxShadow.std,
    padding: theme.marginBase * 2,
    backdropFilter: 'blur(10px)',
  },
  titleWrapper: {
    maxWidth: theme.boxWidth.large,
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    ...theme.fonts.h1,
    background: theme.colors.blueGradiant,
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
}));

interface Props {
  text: string;
  children?: React.ReactNode;
}

export const PageHeader = ({ text, children }: Props) => {
  const classes = useStyles({ theme });
  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleWrapper}>
        <h1 className={classes.title}>{text}</h1>
        {children}
      </div>
    </div>
  );
};
