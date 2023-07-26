import React, { Fragment } from 'react';
import { Outlet } from 'react-router';
import MainNav from '../components/Navbar/MainNav';
import Footer from '../components/footer/Footer';
import { ToastContainer } from 'react-toastify';


const AppLayout = () => {
  return (
    <Fragment>
      <ToastContainer />
      <MainNav />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default AppLayout;
