import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import UserProtectedWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import { Footerdemo } from "./components/ui/footer-section";
import Navbar from "./pages/Navbar";
import Nothing from "./pages/Nothing";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import Home from "./pages/Home";
import RideConfirmation from "./pages/RideConfirmation";
import PaymentPage from "./pages/PaymentPage";
import RatingFeedback from "./pages/RatingFeedBack";
import HelpSupport from "./pages/HelpSupport";
import About from "./pages/About";
import Services from "./pages/Services";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="top-0 w-full z-50">
        <Navbar />
      </div>
      <div className="flex-grow mt-5 mb-16">
        {" "}
        {/* Add margin-top to prevent navbar overlap */}
        <Routes>
          <Route path="*" element={<Nothing />} />
          <Route path="/" element={<Start />} />
          <Route path="/captains-login" element={<CaptainLogin />} />
          <Route path="/captains-signup" element={<CaptainSignUp />} />
          <Route path="/users-login" element={<UserLogin />} />
          <Route path="/users-signup" element={<UserSignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ride-confirmation" element={<RideConfirmation />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/rating-feedback" element={<RatingFeedback />} />
          <Route path="/contact" element={<HelpSupport />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          <Route
            path="/captains-home"
            element={
              <CaptainHome />
              // <CaptainProtectedWrapper>
              // </CaptainProtectedWrapper>
            }
          />
          <Route
            path="/users/logout"
            element={
              <UserProtectedWrapper>
                <UserLogout />
              </UserProtectedWrapper>
            }
          />
        </Routes>
      </div>
      <div className=" bottom-0 w-full">
        <Footerdemo />
      </div>
    </div>
  );
};

export default App;
