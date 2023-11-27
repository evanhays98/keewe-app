import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import Select, { GroupBase, StylesConfig } from 'react-select';
import { useFormikContext } from 'formik';
import classnames from 'classnames';

const colourStyles: StylesConfig<any, false, GroupBase<any>> = {
  control: (styles: any, { isFocused }) => ({
    ...theme.fonts.caption,
    fontWeight: 500,
    ...styles,
    borderLeft: ` solid 2px ${theme.colors.transparentDarkGray}`,
    borderRight: ` solid 2px ${theme.colors.transparentDarkGray}`,
    borderRadius: theme.borderRadius.std,
    borderBottom: `2px solid ${theme.colors.lightGray}50`,
    borderTop: '0px solid transparent',
    boxShadow: 'none',

    '&:hover': {
      borderBottom: `2px solid ${theme.colors.lightGray}`,
    },


  }),
  option: (styles: any, { isSelected, isFocused, isDisabled }: any) => {
    const bg = isSelected ? `${theme.colors.blue}a0`
      : (isFocused) ? `${theme.colors.blue}40` : 'transparent';
    return {
      ...styles,
      ...theme.fonts.caption,
      backgroundColor: bg,
      color: theme.colors.black,
      '&:hover': {
        backgroundColor: bg,
      },
    };
  },
};

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  select: {
    width: '100%',
  },
  container: {
    width: '100%',
    position: 'relative',
    marginTop: theme.marginBase * 2,
  },
  label: {
    position: 'absolute',
    left: theme.marginBase,
    ...theme.fonts.label,
    marginLeft: 0,
    top: 6,
    paddingLeft: theme.marginBase / 2,
    transition: 'all ease-in-out 0.2s',
    pointerEvents: 'none',
  },
  labelOpen: {
    top: -theme.marginBase * 3,
    left: 0,
    fontWeight: 700,
    color: theme.colors.blue,
    transition: 'all ease-in-out 0.2s',
    paddingLeft: '1%',
  },
  error: {
    ...theme.fonts.caption,
    fontSize: theme.fonts.caption.fontSize - 1,
    marginLeft: 4,
    paddingLeft: theme.marginBase / 2,
    paddingTop: theme.marginBase / 2,
    fontWeight: 500,
    color: theme.colors.red,
  },

}));

export interface Options {
  value: any;
  label: string;
}

interface Props {
  options: Options[];
  name: string;
  label?: string;
  reset?: boolean;
}

export const SelectFormik = ({ options, name, label, reset }: Props) => {
  const classes = useStyles({ theme });
  const formik = useFormikContext<any>();
  const [val, setVal] = useState(formik.values[name] || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (reset) {
      console.log('reset', reset, formik.values[name]);
      setVal(formik.values[name] || undefined);
    }
    // eslint-disable-next-line
  }, [reset]);

  return (
    <div className={classes.container}>
      <Select
        className={classes.select}
        defaultValue={null}
        onChange={(option) => {
          formik.setFieldValue(name, option?.value);
          setVal(option?.value);
          formik.setFieldTouched(name, true, false);
        }}
        value={options.find((option) => option.value === val) || null}
        options={options}
        styles={colourStyles}
        onMenuOpen={() => {
          setIsMenuOpen(true);
        }}
        onMenuClose={() => {
          setIsMenuOpen(false);
        }}
        placeholder=''
      />
      {label && <label className={classnames(classes.label, {
        [classes.labelOpen]: isMenuOpen || !!val,
      })}>{label}</label>}
      {formik.touched[name] && formik.errors[name] ? (
        <div className={classes.error}>{formik.errors[name]?.toString()}</div>
      ) : null}
    </div>
  );
};
