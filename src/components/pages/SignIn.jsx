import React, { Fragment } from 'react';
import Signin from '../components/signForms/Signin';
import MainNav from '../components/Navbar/MainNav';

const SignIn = () => {
  return (
    <Fragment>
      <MainNav />
      <Signin />
    </Fragment>
  );
};

export default SignIn;
