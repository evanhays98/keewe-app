import React from 'react';
import { theme } from '../../libs/theme';
import { Button, Formix, FormixError, PageTitle } from '../../libs/core';
import Input from '../../libs/core/Input/Input';
import { useLogin, useMe } from '../../libs/api';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik';
import { AxiosError } from 'axios';
import { useStylesRegisterLogin } from '../styles/LoginRegisterStyles';

interface Values {
  identifier: string;
  password: string;
  error?: string;
}

const validationSchema = Yup.object().shape({
  identifier: Yup.string()
    .required('Field is required')
    .min(3, 'Identifier must be at least 3 characters long'),
  password: Yup.string().required('Field is required'),
});

export const Login = () => {
  const classes = useStylesRegisterLogin({ theme });
  const { data: me, isLoading } = useMe();
  const { mutateAsync: login } = useLogin();
  const navigate = useNavigate();

  const submit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await login(values);
      navigate('/');
    } catch (e) {
      if (e instanceof AxiosError) {
        helpers.setErrors({
          error: e.response?.data?.message || "Une erreur s'est produite",
        });
      }
      throw e;
    }
  };

  if (me && !isLoading) {
    return <Navigate to="/" />;
  }

  return (
    <div className={classes.page}>
      <PageTitle text="Log in" />
      <Formix
        initialValues={{ identifier: '', password: '' }}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        <Input title="Mail or Username" name="identifier" />
        <Input title="Password" name="password" type="password" eye />
        <FormixError />
        <Button text="Register" type="submit" full />
        <Button
          line
          onClick={() => {
            navigate('/register');
          }}
        >
          <div>Don't have an account</div>
        </Button>
      </Formix>
    </div>
  );
};
