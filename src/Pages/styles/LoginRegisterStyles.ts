import { createUseStyles } from 'react-jss';
import { Theme } from '../../libs/theme';

export const useStylesRegisterLogin = createUseStyles((theme: Theme) => ({
  page: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: theme.marginBase * 6,
    flexDirection: 'column',
    padding: theme.marginBase,
    paddingBottom: theme.marginBase * 6,
    zIndex: 1,
    position: 'relative',
    maxWidth: theme.boxWidth.tiny,
    margin: '0 auto',
  },
  container: {
    ...theme.basicFlex,
    gap: theme.marginBase * 2,
    margin: theme.marginBase * 2,
  },
}));
