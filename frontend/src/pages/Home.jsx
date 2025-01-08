import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1340,w_1072/v1684852612/assets/ba/4947c1-b862-400e-9f00-668f4926a4a2/original/Ride-with-Uber.png)] bg-cover h-screen flex items-center justify-between flex-col w-full bg-red-400">
        <img
          className="w-13 m-2 shadow-sm "
          src={Logo}
          alt="SwiftCab Logo"
        />

        <div className="bg-white py-4 px-4 rounded-md shadow-lg text-center w-full">
          <h2 className=" text-xl  font-bold text-md mb-5">
            Get Started with SwiftCab
          </h2>
          <div className="w-full flex-col flex item center text-center justify-center">
            <Link
              to="/login" 
              className="  bg-black w-full text-white px-2 py-2 hover:bg-slate-950 transition duration-300"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
