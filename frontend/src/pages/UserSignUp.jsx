import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${password} Submitted Successfully`
    );
    setUserData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#e6e6e6] p-3">
      <img className="w-fit h-20 mx-auto mb-2" src={Logo} alt="SwiftCab Logo" />
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">User Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">
              What is your name?
            </label>
            <div className="flex gap-2">
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="bg-gray-200 rounded px-3 py-2 border border-gray-300 w-1/2 text-lg"
                placeholder="First Name"
              />
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="bg-gray-200 rounded px-3 py-2 border border-gray-300 w-1/2 text-lg"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">Email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="bg-gray-200 rounded px-3 py-2 border border-gray-300 w-full text-lg"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">Password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="bg-gray-200 rounded px-3 py-2 border border-gray-300 w-full text-lg"
              placeholder="password"
            />
          </div>
          <button
            className="bg-black text-white py-2 rounded-md font-semibold w-full mb-3"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-center font-semibold text-md">
            Already have an account?{" "}
            <Link to="/user-login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/captain-signup"
        className="bg-green-500 flex items-center justify-center font-semibold text-white py-2 rounded-md mt-3 w-full max-w-md"
      >
        Sign In As Captain
      </Link>
    </div>
  );
};

export default UserSignUp;
