/** @format */

import React, { Fragment } from 'react';
import Signup from '../components/signForms/Signup';
import MainNav from '../components/Navbar/MainNav';

const SignUp = () => {
  return (
    <Fragment>
      <MainNav />
      <Signup />
    </Fragment>
  );
};

export default SignUp;
