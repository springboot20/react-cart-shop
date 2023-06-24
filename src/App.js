/** @format */

import React, { Fragment } from 'react';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import { Route, Routes } from 'react-router';
import Home from './components/pages/Home';
import { AuthProvider } from './components/util/AuthContext';
import Product from './components/pages/Product';
import { CartProvider } from './components/context/product/CartContext';
import CheckOut from './components/pages/CheckOut';
import Products from './components/pages/Products';
import NotFound from './components/components/notFound/NotFound';
import RequireAuth from './components/util/RequireAuth';
import Cart from './components/pages/Cart';
import { ToastContainer } from 'react-toastify';
import Profile from './components/pages/Profile';

const App = () => {
  return (
    <Fragment>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route
              path='/products'
              element={
                <RequireAuth>
                  <Products />
                </RequireAuth>
              }
            />
            <Route
              path='/products/:id'
              element={
                <RequireAuth>
                  <Product />
                </RequireAuth>
              }
            />
            <Route
              path='/check-out'
              element={
                <RequireAuth>
                  <CheckOut />
                </RequireAuth>
              }
            />
            <Route
              path='/cart'
              element={
                <RequireAuth>
                  <Cart />
                </RequireAuth>
              }
            />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Fragment>
  );
};

export default App;