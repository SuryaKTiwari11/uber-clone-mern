import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import gsap from "gsap";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";

const UserLogin = () => {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const captainButtonRef = useRef(null);

  useEffect(() => {
    // Wait for refs to be available
    if (formRef.current && titleRef.current && captainButtonRef.current) {
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

      // Add hover animations
      const handleMouseEnter = () => {
        gsap.to(captainButtonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(captainButtonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      captainButtonRef.current.addEventListener("mouseenter", handleMouseEnter);
      captainButtonRef.current.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup
      return () => {
        if (captainButtonRef.current) {
          captainButtonRef.current.removeEventListener(
            "mouseenter",
            handleMouseEnter
          );
          captainButtonRef.current.removeEventListener(
            "mouseleave",
            handleMouseLeave
          );
        }
      };
    }
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
      phone: formData.phone,
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
        phone: "",
        password: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to continue your journey
          </p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-6">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              loginMethod === "email"
                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setLoginMethod("email")}
          >
            <Mail className="inline-block w-4 h-4 mr-2" />
            Email
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              loginMethod === "phone"
                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400"
            }`}
            onClick={() => setLoginMethod("phone")}
          >
            <Phone className="inline-block w-4 h-4 mr-2" />
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dynamic Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {loginMethod === "email" ? "Email Address" : "Phone Number"}
            </label>
            <input
              type={loginMethod === "email" ? "email" : "tel"}
              name={loginMethod}
              value={formData[loginMethod]}
              onChange={(e) =>
                setFormData({ ...formData, [loginMethod]: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder={
                loginMethod === "email"
                  ? "you@example.com"
                  : "Enter phone number"
              }
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            Sign In
          </Button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <button className="flex items-center justify-center py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/users-signup"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
