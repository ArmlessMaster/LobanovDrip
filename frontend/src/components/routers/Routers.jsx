import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AddItem, Main, Store, Authorization, ShowProduct, ChangePassword, Cart, ChangeAccount, Orders, HelpDesign, ChangeDesign, SavedDesign, Feedback, Faq} from '../pages/index';
import {StoreByTypes} from '../pages/storeByTypes/StoreByTypes';

export const useRoutes = isAuthenticated =>{


  return (
    <Routes>
      <Route path='/main' exact element={<Main/>} />
      <Route path='/auth' exact element={<Authorization/>} />
      <Route path='/store' exact element={<Store/>} />
      <Route path='/store/:type' exact element={<StoreByTypes/>} />
      <Route path='/cart' exact element={<Cart/>} />
      <Route path='/password' exact element={<ChangePassword/>} />
      <Route path='/orders' exact element={<Orders/>} />
      <Route path='/account' exact element={<ChangeAccount/>} />
      <Route path='/additem' exact element={<AddItem/>} />
      <Route path='/modeling/:id' exact element={<ChangeDesign/>} />
      <Route path='/design' exact element={<HelpDesign/>} />
      <Route path='/design/saved' exact element={<SavedDesign/>} />
      <Route path='/store/:type/:id' exact element={<ShowProduct />} />
      <Route path='/feedback' exact element={<Feedback/>} />
      <Route path='/faq' exact element={<Faq/>} />
      <Route path="/*" element={<Navigate replace to="/main" />} />
    </Routes>
  )
} 
