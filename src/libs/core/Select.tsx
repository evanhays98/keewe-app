import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Theme, theme } from 'src/libs/theme';
import Select from 'react-select';
import { useFormikContext } from 'formik';

const useStyles = createUseStyles<string, {}, any>((theme: Theme) => ({
  select: {
    width: '100%',
  },
  container: {
    width: '100%',
  },
  label: {
    ...theme.fonts.label,
    color: theme.colors.blue,
    marginBottom: theme.marginBase,
  },
  error: {
    ...theme.fonts.caption,
    fontSize: theme.fonts.caption.fontSize - 1,
    marginLeft: '2%',
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

  useEffect(() => {
    if (reset) {
      console.log('reset', reset, formik.values[name]);
      setVal(formik.values[name] || undefined);
    }
    // eslint-disable-next-line
  }, [reset]);

  return (
    <div className={classes.container}>
      {label && <label className={classes.label}>{label}</label>}
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
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className={classes.error}>{formik.errors[name]?.toString()}</div>
      ) : null}
    </div>
  );
};
