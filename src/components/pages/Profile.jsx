/** @format */

import React from 'react';
import ProfileForm from '../components/profile/ProfileForm';
import SideNav from '../components/Navbar/SideNav';
import MainNav from '../components/Navbar/MainNav';

const Profile = () => {
  return (
    <>
      <MainNav />
      <section className='mt-24 mx-auto max-w-7xl lg:max-w-[95rem]'>
        <SideNav />
        <ProfileForm />
      </section>
    </>
  );
};

export default Profile;
