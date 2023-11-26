import React from 'react';
import { theme } from '../../libs/theme';
import { Button, Formix, FormixError, PageTitle } from '../../libs/core';
import Input from '../../libs/core/Input/Input';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMe, useRegister } from '../../libs/api';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { FormikHelpers } from 'formik';
import { useStylesRegisterLogin } from '../styles/LoginRegisterStyles';

interface Values {
  mail: string;
  password: string;
  username: string;
  confirmPassword: string;
}

const initialValues: Values = {
  mail: '',
  password: '',
  username: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  mail: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])/,
      'Password must contain at least one uppercase letter',
    )
    .matches(
      /^(?=.*[a-z])/,
      'Password must contain at least one lowercase letter',
    )
    .matches(/^(?=.*[0-9])/, 'Password must contain at least one number'),
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const Register = () => {
  const classes = useStylesRegisterLogin({ theme });
  const { data: me, isLoading } = useMe();
  const { mutateAsync: register } = useRegister();
  const navigate = useNavigate();

  const submit = async (values: Values, helpers: FormikHelpers<any>) => {
    try {
      await register({
        mail: values.mail,
        password: values.password,
        username: values.username,
      });
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
      <PageTitle text="Sign up" />
      <Formix
        initialValues={initialValues}
        onSubmit={submit}
        validationSchema={validationSchema}
      >
        <Input title="Email" name="mail" />
        <Input title="Username" name="username" />
        <Input title="Password" name="password" type="password" eye />
        <Input
          title="Confirm Password"
          name="confirmPassword"
          type="password"
          eye
        />
        <FormixError />
        <Button text="Register" type="submit" full />
        <Button
          line
          onClick={() => {
            navigate('/login');
          }}
        >
          <div>Already have an account</div>
        </Button>
      </Formix>
    </div>
  );
};
