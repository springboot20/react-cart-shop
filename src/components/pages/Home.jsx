/** @format */

import React, { Fragment } from 'react';
import MainNav from '../components/Navbar/MainNav';
import CarouselSlide from '../components/carousel/Carousel';
import Footer from '../components/footer/Footer';

const Home = () => {
  return (
    <Fragment>
      <MainNav />
      <CarouselSlide/>
      <Footer />
    </Fragment>
  );
};

export default Home;
