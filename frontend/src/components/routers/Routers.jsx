import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Authorization } from '../pages/authorization/Authorization';
import { Store } from '../pages/store/Store';
import { AddItem } from '../pages/addItem/AddItem';

export const useRoutes = isAuthenticated =>{


  return (
    <Routes>
      <Route path='/auth' exact element={<Authorization/>} />
      <Route path='/store' exact element={<Store/>} />
      <Route path='/additem' exact element={<AddItem/>} />
      <Route path="/*" element={<Navigate replace to="/auth" />} />
    </Routes>
  )
}
