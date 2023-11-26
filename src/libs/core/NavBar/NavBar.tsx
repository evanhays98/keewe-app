import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../theme';
import { NavBarLink } from './NavBarLink';
import { Icon } from '../Icons';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  page: {
    height: window.innerHeight,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    overscrollBehavior: 'none',
    width: '100%',

    '@media (min-width: 768px)': {
      flexDirection: 'row-reverse',
    },
  },
  navBar: {
    width: '100%',
    padding: [theme.marginBase * 2, theme.marginBase * 3],
    ...theme.basicFlex,
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 100,
    overflow: 'hidden',
    overscrollBehavior: 'none',
    background: '#bce2e3',
    boxShadow: `0px 0px 10px 4px ${theme.colors.blue}60`,

    '@media (min-width: 768px)': {
      width: 'fit-content',
      flexDirection: 'column',
      padding: [theme.marginBase * 4, theme.marginBase * 2],
      borderTopLeftRadius: 0,
      justifyContent: 'flex-start',
      gap: theme.marginBase * 3,
    },
  },
  pageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    overscrollBehavior: 'none',
  },
}));

interface Props {
  children?: React.ReactNode;
}

export const NavBar = ({ children }: Props) => {
  const classes = useStyles({ theme });
  return (
    <div className={classes.page}>
      <div className={classes.pageContainer} id="main-container">
        {children}
      </div>
      <div className={classes.navBar}>
        <NavBarLink icon={Icon.home} to="/" />
        <NavBarLink icon={Icon.payment} to="/payments" />
        <NavBarLink icon={Icon.swap} to="/convert" />
        <NavBarLink icon={Icon.history} to="/history" />
      </div>
    </div>
  );
};
