import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import Routes from './components/route/Routes';
import { AuthProvider } from './components/util/AuthContext';
import { ModeProvider } from './components/context/theme/ThemeContext';
import { ProductProvider } from './components/context/product/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ModeProvider>
        <ProductProvider>
          <RouterProvider router={Routes}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </RouterProvider>
        </ProductProvider>
      </ModeProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log('hello'));
