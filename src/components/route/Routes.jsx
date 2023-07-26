import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Product from '../pages/Product';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Cart from '../pages/Cart';
import NotFound from '../components/notFound/NotFound';
import AppLayout from '../layout/AppLayout';
import RequiredAuth from '../util/RequireAuth';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'products',
        element: (
          <RequiredAuth>
            <Products />
          </RequiredAuth>
        ),
      },
      {
        path: 'products/:id',
        element: (
          <RequiredAuth>
            <Product />
          </RequiredAuth>
        ),
      },
      {
        path: 'cart',
        element: (
          <RequiredAuth>
            <Cart />
          </RequiredAuth>
        ),
      },
      {
        path: 'auth',
        children: [
          {
            path: 'signup',
            element: <SignUp />,
          },
          {
            path: 'signin',
            element: <SignIn />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default Routes;
