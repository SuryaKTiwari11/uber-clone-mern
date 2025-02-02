import { useContext, useState, useEffect, useRef } from "react";
import gsap from "gsap";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const captainButtonRef = useRef(null);

  useEffect(() => {
    // Initial setup
    gsap.set([formRef.current, titleRef.current, captainButtonRef.current], {
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
        captainButtonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.3"
      );

    // Success animation for form submission
    const handleSuccess = () => {
      gsap.to(formRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.4,
      });
    };

    // Error animation
    const handleError = () => {
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
      });
    };

    return () => {
      // Cleanup animations
      gsap.killTweensOf([
        formRef.current,
        titleRef.current,
        captainButtonRef.current,
      ]);
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
    const newUser = {
      fullname: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      email: formData.email,
      password: formData.password,
    };

    console.log("Request Payload:", newUser);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      console.log(response);
      if (response.status === 201 && response.data) {
        gsap.to(formRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            navigate("/home");
          },
        });
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
      });
    }

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] p-3">
      <div
        ref={formRef}
        className="bg-white p-4 rounded-md shadow-lg w-full max-w-md"
      >
        <h1 ref={titleRef} className="text-xl font-bold mb-4 text-center">
          User Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">
              What is your name?
            </label>
            <div className="flex gap-2">
              <Input
                required
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                type="text"
                className="w-1/2"
                placeholder="First Name"
              />
              <Input
                required
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">Password</label>
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
          <Button className="w-full mb-3" type="submit">
            Sign Up
          </Button>
          <p className="text-center font-semibold text-md">
            Already have an account?{" "}
            <Link to="/users-login" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Link
        ref={captainButtonRef}
        to="/captains-signup"
        className="bg-green-500 hover:bg-green-600 transition-all duration-300 flex items-center justify-center font-semibold text-white py-2 rounded-md mt-3 w-full max-w-md"
      >
        Sign Up As Captain
      </Link>
    </div>
  );
};

export default UserSignUp;
