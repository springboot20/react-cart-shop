/** @format */

import React from 'react';
import MainNav from '../components/Navbar/MainNav';
import Footer from '../components/footer/Footer';
import ProfileForm from '../components/profile/ProfileForm';

const Profile = () => {
  return (
    <div>
      <MainNav />
      <section className='mt-24'>
        <div className='container grid grid-cols-7'>
          <ProfileForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;
