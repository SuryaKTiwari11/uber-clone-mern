/* eslint-disable no-unused-vars */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";

const App = () => {
  return (
    <div className="bg-red-500  ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/captainlogin" element={<CaptainLogin />} />
        <Route path="/captainsignup" element={<CaptainSignUp />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
      </Routes>
    </div>
  );
};

export default App;
