import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import gsap from "gsap";
import { Eye, EyeOff, Car, Upload, CheckCircle } from "lucide-react";

const CaptainSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    licensePlate: "",
    driverLicense: null,
    vehicleRegistration: null,
    insurance: null,
    agreeToTerms: false,
  });

  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const userButtonRef = useRef(null);

  useEffect(() => {
    // Wait for refs to be available
    if (formRef.current && titleRef.current && userButtonRef.current) {
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

      // Add hover animations
      const handleMouseEnter = () => {
        gsap.to(userButtonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(userButtonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      userButtonRef.current.addEventListener("mouseenter", handleMouseEnter);
      userButtonRef.current.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup
      return () => {
        if (userButtonRef.current) {
          userButtonRef.current.removeEventListener(
            "mouseenter",
            handleMouseEnter
          );
          userButtonRef.current.removeEventListener(
            "mouseleave",
            handleMouseLeave
          );
        }
        // Cleanup animations
        gsap.killTweensOf([
          formRef.current,
          titleRef.current,
          userButtonRef.current,
        ]);
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

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CaptainData = {
      fullname: {
        firstName: formData.name.split(" ")[0].trim().toLowerCase(),
        lastName: formData.name.split(" ")[1].trim().toLowerCase(),
      },
      email: formData.email.toLowerCase(),
      password: formData.password,
      phone: formData.phone,
      vehicle: {
        color: formData.vehicleColor.toLowerCase(),
        plate: formData.licensePlate,
        model: formData.vehicleModel,
        year: parseInt(formData.vehicleYear),
      },
      documents: {
        driverLicense: formData.driverLicense,
        vehicleRegistration: formData.vehicleRegistration,
        insurance: formData.insurance,
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
          },
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

  // Password strength check
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter phone number"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
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
          </div>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Vehicle Model
          </label>
          <input
            type="text"
            value={formData.vehicleModel}
            onChange={(e) =>
              setFormData({ ...formData, vehicleModel: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Toyota Camry"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Vehicle Year
          </label>
          <input
            type="number"
            value={formData.vehicleYear}
            onChange={(e) =>
              setFormData({ ...formData, vehicleYear: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., 2020"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Vehicle Color
          </label>
          <input
            type="text"
            value={formData.vehicleColor}
            onChange={(e) =>
              setFormData({ ...formData, vehicleColor: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Silver"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            License Plate
          </label>
          <input
            type="text"
            value={formData.licensePlate}
            onChange={(e) =>
              setFormData({ ...formData, licensePlate: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter license plate"
            required
          />
        </div>
      </div>

      {/* Document Upload Section */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 dark:text-white">
          Required Documents
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: "Driver's License",
              field: "driverLicense",
              file: formData.driverLicense,
            },
            {
              label: "Vehicle Registration",
              field: "vehicleRegistration",
              file: formData.vehicleRegistration,
            },
            {
              label: "Insurance",
              field: "insurance",
              file: formData.insurance,
            },
          ].map(({ label, field, file }) => (
            <div
              key={field}
              className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            >
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, field)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*,.pdf"
              />
              <div className="space-y-2">
                <Upload
                  className={`w-8 h-8 mx-auto ${
                    file ? "text-green-500" : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </div>
                {file && (
                  <div className="flex items-center justify-center text-sm text-green-500">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Uploaded
                  </div>
                )}
              </div>
            </div>
          ))}
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
          Submit Application
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Car className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Become a Captain
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join our team and start earning
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
            to="/captains-login"
            className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
