import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './Login/Login';
import { Home } from './Home/Home';
import { Register } from './Login/Register';
import React from 'react';
import { Content } from '../libs/core/Content';
import { Payments } from './Payments/Payments';
import { Conversions } from './Conversions/Conversions';
import { History } from './History/History';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<Content />}>
        <Route path="" element={<Home />} />
        <Route path="payments" element={<Payments />} />
        <Route path="convert" element={<Conversions />} />
        <Route path="history" element={<History />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
