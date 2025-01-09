import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [UserData, setUserData] = useState({
    email: "",
    password: "",
  });
  const SubmitHandlingFunc = (e) => {
    e.preventDefault();
    console.log(`Email: ${email} Password: ${password} Submitted Successfully`);
    setUserData({
      email: email,
      password: password,
    });
    // console.log(UserData);
    setPassword("");
    setEmail("");
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#e6e6e6] p-5">
      <img className="w-30 h-13 mx-auto mb-2" src={Logo} alt="SwiftCab Logo" />
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-5 text-center">User Login</h1>
        <form onSubmit={SubmitHandlingFunc}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">What is your email?</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="bg-gray-200 rounded px-4 py-2  border border-gray-300 w-full text-lg"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold text-lg mb-2">Enter Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="bg-gray-200 rounded px-4 py-2 border border-gray-300 w-full text-lg"
              required
            />
          </div>
          <button
            className="bg-black text-white py-2 rounded-md font-semibold w-full mb-4"
            type="submit"
          >
            Login
          </button>
          <p className="text-center font-semibold  text-md">
            New Here? Create account{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <Link to='/captain-login'
      className="bg-green-500
      flex items-center justify-center font-semibold
      text-white py-2 rounded-md mt-5 w-full max-w-md">
        Sign In As Captain
      </Link>
    </div>
  );
};

export default UserLogin;
