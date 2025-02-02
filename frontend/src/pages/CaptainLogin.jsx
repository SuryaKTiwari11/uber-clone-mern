import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { CaptainDataContext } from "../context/CaptainContext";
import gsap from "gsap";

const CaptainLogin = () => {
  const { setCaptain } = useContext(CaptainDataContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const userButtonRef = useRef(null);

  useEffect(() => {
    // Initial setup
    gsap.set([formRef.current, titleRef.current, userButtonRef.current], {
      opacity: 0,
      y: 30,
    });

    // Entrance animation timeline
    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      .to(userButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

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
    const newCaptain = {
      email: formData.email,
      password: formData.password,
    };

    console.log(newCaptain);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        newCaptain
      );
      if (response.status === 200 && response.data) {
        setCaptain(response.data.captain);
        localStorage.setItem("token", response.data.token);
        navigate("/captains-home");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] p-3">
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md">
        <h1 ref={titleRef} className="text-xl font-bold mb-4 text-center">Captain Login</h1>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">
              What is your email?
            </label>
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
            <label className="block font-semibold text-lg mb-1">
              Enter Password
            </label>
            <Input
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="password"
              className="w-full"
            />
          </div>
          <Button className="w-full mb-3" type="submit">
            Login
          </Button>
          <p className="text-center font-semibold text-md">
            New Here? Create account{" "}
            <Link to="/captains-signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <Link
        ref={userButtonRef}
        to="/users-login"
        className="bg-purple-500 flex items-center justify-center font-semibold text-white py-2 rounded-md mt-3 w-full max-w-md"
      >
        Sign In As User
      </Link>
    </div>
  );
};

export default CaptainLogin;
