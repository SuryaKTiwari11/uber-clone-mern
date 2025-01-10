import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1340,w_1072/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png)] bg-cover h-screen flex items-center justify-between flex-col w-full">
        <img
          className="w-13 m-2 shadow-sm py+3"
          src={Logo}
          alt="SwiftCab Logo"
        />
        <div className="bg-white py-3 px-4 rounded-md shadow-lg text-center w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Get Started with SwiftCab</h2>
          <div className="w-full flex flex-col items-center justify-center">
            <Link
              to="/user-login"
              className="bg-black w-full text-white px-4 py-2 rounded-md hover:bg-slate-950 transition duration-300"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
