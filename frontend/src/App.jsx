
import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import { Footerdemo } from "./components/ui/footer-section";
import Navbar from "./pages/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
      </Routes>
      <div className="        
       bottom-0 w-full">
        <Footerdemo />
      </div>
    </div>
  );
};

export default App;
