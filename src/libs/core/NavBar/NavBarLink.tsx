import React from 'react';
import { createUseStyles } from 'react-jss';
import { theme, Theme } from '../../theme';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Icon, Icons } from '../Icons';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  container: {
    ...theme.basicFlex,
    padding: theme.marginBase / 2,
    borderRadius: theme.borderRadius.std,
  },
  active: {
    background: theme.colors.blueLightGradiant,
    boxShadow: theme.boxShadow.std,
  },
}));

interface Props {
  icon: Icon;
  to: string;
}

export const NavBarLink = ({ icon, to }: Props) => {
  const classes = useStyles({ theme });
  return (
    <NavLink
      to={to}
      className={({ isActive }: any) =>
        classnames(classes.container, { [classes.active]: isActive })
      }
    >
      {icon === Icon.home && <Icons icon={Icon.home} />}
      {icon === Icon.swap && <Icons icon={Icon.swap} />}
      {icon === Icon.payment && <Icons icon={Icon.payment} />}
      {icon === Icon.history && <Icons icon={Icon.history} />}
    </NavLink>
  );
};
