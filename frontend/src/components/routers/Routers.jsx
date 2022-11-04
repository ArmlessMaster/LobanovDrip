import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AddItem, Main, Store, Authorization} from '../pages/index';
import {StoreByTypes} from '../pages/storeByTypes/StoreByTypes'
export const useRoutes = isAuthenticated =>{


  return (
    <Routes>
      <Route path='/auth' exact element={<Authorization/>} />
      <Route path='/main' exact element={<Main/>} />
      <Route path='/store' exact element={<Store/>} />
      <Route path='/store/:t-shirt' exact element={<StoreByTypes key="1" type="T-Shirt"/>} />
      <Route path='/store/:hoodie' exact element={<StoreByTypes key="2"  type="Hoodie"/>} />
      <Route path='/store/pants' exact element={<StoreByTypes key="3"type="Pants"/>} />
      <Route path='/store/cases' exact element={<StoreByTypes key="4" type="Cases"/>} />
      <Route path='/store/briefcase' exact element={<StoreByTypes key="5" type="Brefcase"/>} />
      <Route path='/store/sweatshirts' exact element={<StoreByTypes key="6" type="Sweetshirts"/>} />
      <Route path='/additem' exact element={<AddItem/>} />
      <Route path="/*" element={<Navigate replace to="/auth" />} />
    </Routes>
  )
} 
