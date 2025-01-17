import React, { useContext, useState } from "react";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { Button } from "../components/ui/Button"; // Assuming Button is a custom component
import { Input } from "../components/ui/Input"; // Assuming Input is a custom component

const CaptainSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const CaptainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType,
      },
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        CaptainData
      );
      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
    setCaptain(CaptainData);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] p-3 max-h-xs   ">
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-xs"> 
        <h1 className="text-xl font-bold mb-4 text-center">Captain Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">
              What is your name?
            </label>
            <div className="flex gap-2">
              <Input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="w-1/2"
                placeholder="First Name"
              />
              <Input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="w-1/2"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">Email</label>
            <Input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">Password</label>
            <Input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full"
              placeholder="password"
            />
          </div>
          <div className="flex gap-2 mb-3">
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-1">
                Vehicle Color
              </label>
              <Input
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                type="text"
                className="w-full"
                placeholder="Vehicle Color"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-1">
                Vehicle Plate
              </label>
              <Input
                required
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                type="text"
                className="w-full"
                placeholder="Vehicle Plate"
              />
            </div>
          </div>
          <div className="flex gap-2 mb-3">
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-1">
                Capacity
              </label>
              <Input
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                type="number"
                className="w-full"
                placeholder="Vehicle Capacity"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-1">Type</label>
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-gray-200 rounded px-3 py-2 border border-gray-300 w-full text-lg"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Van">Van</option>
              </select>
            </div>
          </div>
          <Button className="w-full mb-3" type="submit">
            Sign Up
          </Button>
          <p className="text-center font-semibold text-md">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/user-signup"
        className="bg-purple-500 flex items-center justify-center font-semibold text-white py-2 rounded-md mt-3 w-full max-w-xs"
      >
        Sign Up As User
      </Link>
    </div>
  );
};

export default CaptainSignUp;
