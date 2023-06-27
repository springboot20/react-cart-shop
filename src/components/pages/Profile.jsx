/** @format */

import React from 'react';
import ProfileForm from '../components/profile/ProfileForm';
import SideNav from '../components/Navbar/SideNav';
import MainNav from '../components/Navbar/MainNav';

const Profile = () => {
  return (
    <>
      <MainNav />
      <section className='mt-24'>
        <SideNav />
        <ProfileForm />
      </section>
    </>
  );
};

export default Profile;
