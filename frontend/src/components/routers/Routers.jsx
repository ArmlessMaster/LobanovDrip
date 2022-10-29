import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Authorization } from '../pages/authorization/Authorization';

export const useRoutes = isAuthenticated =>{


  return (
    <Routes>
      <Route path='/auth' exact element={<Authorization/>} />
      <Route path="/*" element={<Navigate replace to="/auth" />} />
    </Routes>
  )
}
