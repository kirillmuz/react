/* eslint-disable no-extend-native */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages';
import { RegistrationPage } from './pages/registration';
import { RoutesPaths } from './constants/commonConstants';
import { DepartmentsPage } from './pages/department';
import './styles/globalStyles.scss'

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path={RoutesPaths.Login} element={<LoginPage />} />
      <Route path={RoutesPaths.Registration} element={<RegistrationPage />} />
      <Route path={RoutesPaths.Departments} element={<DepartmentsPage />} />
      <Route path={'*'} element={<LoginPage />} />
    </Routes>
  );
};
