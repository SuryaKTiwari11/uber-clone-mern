import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import gsap from "gsap";

const UserLogin = () => {
  const [formData, setFormData] = useState({
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
      .to(captainButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

    // Add hover animations for the captain button
    captainButtonRef.current.addEventListener("mouseenter", () => {
      gsap.to(captainButtonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    captainButtonRef.current.addEventListener("mouseleave", () => {
      gsap.to(captainButtonRef.current, {
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
    const newUser = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        newUser
      );
      if (response.status === 200 && response.data) {
        // Success animation before navigation
        gsap.to(formRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            setUser(response.data.user);
            localStorage.setItem("token", response.data.token);
            navigate("/home");
          },
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Error shake animation
      gsap.to(formRef.current, {
        x: [-10, 10, -10, 10, 0],
        duration: 0.4,
        ease: "power2.inOut",
      });
    } finally {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] p-3">
      <div 
        ref={formRef}
        className="bg-white p-4 rounded-md shadow-lg w-full max-w-md"
      >
        <h1 
          ref={titleRef}
          className="text-xl font-bold mb-4 text-center"
        >
          User Login
        </h1>
        <form onSubmit={handleSubmit}>
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
          <Button 
            className="w-full mb-3 transition-transform hover:scale-105" 
            type="submit"
          >
            Login
          </Button>
          <p className="text-center font-semibold text-md">
            New Here? Create account{" "}
            <Link to="/users-signup" className="text-blue-500 hover:text-blue-700 transition-colors">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <Link
        ref={captainButtonRef}
        to="/captains-login"
        className="bg-green-500 flex items-center justify-center font-semibold text-white py-2 rounded-md mt-3 w-full max-w-md transition-all hover:bg-green-600"
      >
        Sign In As Captain
      </Link>
    </div>
  );
};

export default UserLogin;
