import { useContext, useState, useEffect, useRef } from "react";
import gsap from "gsap";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const captainButtonRef = useRef(null);

  useEffect(() => {
    // Wait for refs to be available
    if (formRef.current && titleRef.current && captainButtonRef.current) {
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
        // Cleanup animations
        gsap.killTweensOf([
          formRef.current,
          titleRef.current,
          captainButtonRef.current,
        ]);
      };
    }
  }, []);

  // Password strength indicators
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: formData.name.split(" ")[0],
        lastname: formData.name.split(" ")[1] || "",
      },
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      agreeToTerms: formData.agreeToTerms,
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
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your phone number"
          required
        />
      </div>

      <Button
        type="button"
        onClick={() => setStep(2)}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
      >
        Continue
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white pr-10"
            placeholder="Create a strong password"
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

        {/* Password Strength Indicator */}
        <div className="mt-2">
          <div className="flex gap-1 mb-1">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${
                  index < passwordStrength
                    ? "bg-green-500"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {passwordStrength === 0 && "Enter a password"}
            {passwordStrength === 1 && "Weak password"}
            {passwordStrength === 2 && "Fair password"}
            {passwordStrength === 3 && "Good password"}
            {passwordStrength === 4 && "Strong password"}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Confirm your password"
            required
          />
          {formData.password && formData.confirmPassword && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              {formData.password === formData.confirmPassword ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <AlertCircle className="text-red-500" size={20} />
              )}
            </span>
          )}
        </div>
      </div>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={(e) =>
            setFormData({ ...formData, agreeToTerms: e.target.checked })
          }
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          I agree to the{" "}
          <Link
            to="/terms"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Privacy Policy
          </Link>
        </span>
      </label>

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={() => setStep(1)}
          className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={!formData.agreeToTerms}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create Account
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join us for a better ride experience
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          <div className="flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              1
            </div>
          </div>
          <div
            className={`flex-1 h-1 ${
              step >= 2 ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
            }`}
          />
          <div className="flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              2
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 ? renderStep1() : renderStep2()}
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/users-login"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
