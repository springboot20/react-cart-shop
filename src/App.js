/** @format */

import React from 'react';
import AppLayout from './components/layout/AppLayout';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import Product from './components/pages/Product';
import RequireAuth from './components/util/RequireAuth';
import Cart from './components/pages/Cart';
import Profile from './components/pages/Profile';

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/auth/signin' element={<SignIn />} />
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/' element={<AppLayout />}>
          <Route path='/' element={<Home />} />
          <Route
            path='products'
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path='products/:id'
            element={
              <RequireAuth>
                <Product />
              </RequireAuth>
            }
          />
          <Route path='auth/profile' element={<Profile />} />
          <Route path='cart' element={<Cart />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;
