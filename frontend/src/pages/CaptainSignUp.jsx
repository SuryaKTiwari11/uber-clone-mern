import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import gsap from "gsap";

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

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const userButtonRef = useRef(null);

  useEffect(() => {
    // Initial setup
    gsap.set([formRef.current, titleRef.current, userButtonRef.current], {
      opacity: 0,
      y: 20,
    });

    // Entrance animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    })
      .to(
        formRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      )
      .to(
        userButtonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      );

    // Add hover animations for the user button
    userButtonRef.current.addEventListener("mouseenter", () => {
      gsap.to(userButtonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    userButtonRef.current.addEventListener("mouseleave", () => {
      gsap.to(userButtonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    return () => {
      // Cleanup animations
      gsap.killTweensOf([formRef.current, titleRef.current, userButtonRef.current]);
    };
  }, []);

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
      fullname: {
        firstname: formData.firstName.trim().toLowerCase(),
        lastname: formData.lastName.trim().toLowerCase(),
      },
      email: formData.email.toLowerCase(),
      password: formData.password,
      vehicle: {
        color: formData.vehicleColor.toLowerCase(),
        plate: formData.vehiclePlate,
        capacity: Number(formData.vehicleCapacity),
        vehicleType: formData.vehicleType.toLowerCase(),
      },
    };

    try {
      console.log("Attempting to register with data:", CaptainData);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        CaptainData
      );
      console.log("Response:", response.data);
      if (response.status === 201 && response.data) {
        // Success animation
        gsap.to(formRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            setCaptain(response.data.captain);
            localStorage.setItem("token", response.data.token);
            navigate("/captains-home");
          }
        });
      }
    } catch (error) {
      console.error("Registration error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        requestData: CaptainData,
      });
      // Error shake animation
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
      });
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#ffffff] p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 ref={titleRef} className="text-xl font-bold mb-4 text-center">Captain Sign Up</h1>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              What is your name?
            </label>
            <div className="flex gap-2">
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

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
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

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
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

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">
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
            <div>
              <label className="block text-sm font-medium mb-1">
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

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Capacity</label>
              <Input
                required
                name="vehicleCapacity"
                value={formData.vehicleCapacity}
                onChange={handleChange}
                type="number"
                min="1"
                className="w-full"
                placeholder="Capacity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                required
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select Type</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="truck">Truck</option>
                <option value="van">Van</option>
                <option value="bus">Bus</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <Button className="w-full" type="submit">
            Sign Up
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/captains-login"
              className="text-purple-500 font-medium hover:text-purple-600"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      <Link
        ref={userButtonRef}
        to="/users-signup"
        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md mt-4 text-center w-full max-w-md text-sm font-medium transition-colors"
      >
        Sign Up As User
      </Link>
    </div>
  );
};

export default CaptainSignUp;
