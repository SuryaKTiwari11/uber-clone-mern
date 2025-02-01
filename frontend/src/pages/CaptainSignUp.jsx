import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const CaptainSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vehicleColor: "",
    vehiclePlate: "",
    vehicleCapacity: "",
    vehicleType: "",
  });

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const CaptainData = {
      fullName: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.vehicleColor,
        plate: formData.vehiclePlate,
        capacity: formData.vehicleCapacity,
        type: formData.vehicleType,
      },
    };

    console.log("Request Payload:", CaptainData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        CaptainData
      );
      console.log(response);
      if (response.status === 201) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      vehicleColor: "",
      vehiclePlate: "",
      vehicleCapacity: "",
      vehicleType: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#ffffff] p-6">
      <div className="bg-white p-8 rounded-md shadow-lg w-full h-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Captain Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              What is your name?
            </label>
            <div className="flex gap-4">
              <Input
                required
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                className="w-1/2"
                placeholder="First Name"
              />
              <Input
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                className="w-1/2"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Email</label>
            <Input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Password</label>
            <Input
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="w-full"
              placeholder="password"
            />
          </div>
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-2">
                Vehicle Color
              </label>
              <Input
                required
                name="vehicleColor"
                value={formData.vehicleColor}
                onChange={handleChange}
                type="text"
                className="w-full"
                placeholder="Vehicle Color"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-2">
                Vehicle Plate
              </label>
              <Input
                required
                name="vehiclePlate"
                value={formData.vehiclePlate}
                onChange={handleChange}
                type="text"
                className="w-full"
                placeholder="Vehicle Plate"
              />
            </div>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-2">
                Capacity
              </label>
              <Input
                required
                name="vehicleCapacity"
                value={formData.vehicleCapacity}
                onChange={handleChange}
                type="number"
                className="w-full"
                placeholder="Vehicle Capacity"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-semibold mb-2">Type</label>
              <select
                required
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
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
          <Button className="w-full mb-6" type="submit">
            Sign Up
          </Button>
          <p className="text-center font-semibold text-md">
            Already have an account?{" "}
            <Link to="/captains-login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/users-signup"
        className="bg-purple-500 flex items-center justify-center font-semibold text-white py-3 rounded-md mt-6 w-full max-w-lg"
      >
        Sign Up As User
      </Link>
    </div>
  );
};

export default CaptainSignUp;
