import React from "react";
import MainNavbar from "../Navbar/MainNav"
import { faBell } from "@fortawesome/fontawesome-free-regular";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const UnAuthorized = () => {
  return (
    <React.Fragment>
      <MainNavbar />
      <section className="flex justify-center items-center flex-col p-4 min-h-screen">
        <div className="hero-container">
          <p className="text-blue-500 text-center mb-10 text-6xl font-bold">409</p>
          <h2 className="text-4xl text-red-500 font-bold mb-5 text-center">
            Unauthorized Message
          </h2>
          <p className="text-2xl font-semibold text-gray-700">
            You are Unauthorized Please try to
            <Link to="/signup" className="underline text-red-500 mx-2">
              Signup
            </Link>
            /
            <Link to="/signin" className="underline text-red-500 mx-2">
              Signin
            </Link>
            to be authorized
          </p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default UnAuthorized;
