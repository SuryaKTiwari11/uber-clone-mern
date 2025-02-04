import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RetroGrid } from "../components/ui/retro-grid";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Navbar from "./Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialCarousel from "../components/home/TestimonialCarousel";
import { Button } from "../components/ui/Button";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HOW_IT_WORKS_STEPS = [
  {
    icon: "📍",
    title: "Set Your Location",
    description: "Enter your pickup & drop-off points",
  },
  {
    icon: "🚗",
    title: "Choose Your Ride",
    description: "Select from our range of vehicles",
  },
  {
    icon: "💳",
    title: "Pay & Go",
    description: "Pay securely and enjoy your ride",
  },
];

const FEATURES = [
  {
    icon: "💰",
    title: "Best Prices",
    description: "Competitive rates and transparent pricing",
  },
  {
    icon: "🚘",
    title: "Multiple Options",
    description: "Choose from Economy to Luxury rides",
  },
  {
    icon: "🗺️",
    title: "Live Tracking",
    description: "Real-time location updates",
  },
  {
    icon: "🛡️",
    title: "24/7 Support",
    description: "Help available round the clock",
  },
];

const SAFETY_FEATURES = [
  "Verified Drivers",
  "Emergency SOS Button",
  "Share Trip Details",
  "Driver Background Checks",
  "Real-time Trip Monitoring",
  "24/7 Customer Support",
];

const Start = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const howItWorksRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Initial setup
    gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 50,
    });

    // Entrance animation timeline
    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out",
    })
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

    // Floating animation for title
    gsap.to(titleRef.current, {
      y: "+=10",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Glowing effect for button
    gsap.to(buttonRef.current, {
      boxShadow: "0 0 20px rgba(255,255,255,0.8)",
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Animate How It Works section
    const steps = howItWorksRef.current.children;
    gsap.set(steps, { opacity: 1 });
    gsap.from(steps, {
      y: 50,
      stagger: 0.2,
      scrollTrigger: {
        trigger: howItWorksRef.current,
        start: "top center+=100",
      },
    });

    // Animate Features section
    const features = featuresRef.current.children;
    gsap.set(features, { opacity: 1 });
    gsap.from(features, {
      scale: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top center+=100",
      },
    });
  }, []);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <RetroGrid />
      <div
        className={`relative flex flex-col h-screen w-full items-center justify-center overflow-hidden rounded-lg border transition-colors duration-500 ${
          isDarkMode ? "bg-dark-background" : "bg-background"
        }`}
      >
        <h1
          ref={titleRef}
          className="
          text-center text-8xl font-extrabold text-black bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        >
          Swift Cab
        </h1>
        <div ref={subtitleRef}>
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="
            text-center text-3xl font-medium text-gray-700 mt-8
            transition-all duration-300 hover:scale-105
            "
          >
            Hope in lil bro, we&apos;re going places!
          </TextAnimate>
        </div>
        <div ref={buttonRef}>
          <Link to="/users-login">
            <RainbowButton className="mt-6 p-2 size-large w-40 h-12 text-xl font-semibold transform hover:scale-110 transition-all duration-300 ease-out hover:rotate-2">
              Get Started
            </RainbowButton>
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={`py-20 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
          >
            How It Works
          </h2>
          <div
            ref={howItWorksRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div
                key={index}
                className={`${
                  isDarkMode
                    ? "bg-gray-800/50 text-white"
                    : "bg-white text-gray-800"
                } backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700`}
                style={{
                  background: isDarkMode
                    ? "rgba(31, 41, 55, 0.5)"
                    : "rgba(255, 255, 255, 0.9)",
                }}
              >
                <div className="text-4xl mb-4 transform hover:scale-110 transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        className={`py-20 px-4 ${isDarkMode ? "bg-gray-800" : "bg-blue-50"}`}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
          >
            Why Choose Us
          </h2>
          <div
            ref={featuresRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className={`${
                  isDarkMode
                    ? "bg-gray-900/50 text-white"
                    : "bg-white text-gray-800"
                } rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700`}
              >
                <div className="text-4xl mb-4 transform hover:rotate-12 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Section */}
      <div className={`py-20 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
              >
                Your Safety is Our Priority
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SAFETY_FEATURES.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    } p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                  >
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div
                className={`absolute inset-0 ${
                  isDarkMode ? "bg-blue-500/20" : "bg-blue-200/50"
                } blur-3xl rounded-full animate-pulse`}
              ></div>
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square flex items-center justify-center">
                  {/* Shield SVG with Animation */}
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-64 h-64 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    } transform transition-transform hover:scale-105`}
                  >
                    <g
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      {/* Outer Shield */}
                      <path
                        stroke="currentColor"
                        fill={
                          isDarkMode
                            ? "rgba(59, 130, 246, 0.1)"
                            : "rgba(37, 99, 235, 0.1)"
                        }
                        d="M12 2.5c-3.5 0-7 1.5-9 3.5v5c0 5.5 3.5 9.5 9 11.5 5.5-2 9-6 9-11.5v-5c-2-2-5.5-3.5-9-3.5z"
                        className="animate-pulse"
                      />

                      {/* Inner Shield Pattern */}
                      <path
                        stroke="currentColor"
                        fill={
                          isDarkMode
                            ? "rgba(59, 130, 246, 0.15)"
                            : "rgba(37, 99, 235, 0.15)"
                        }
                        d="M12 3.5c-3 0-6 1.25-7.5 3v4c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5v-4c-1.5-1.75-4.5-3-7.5-3z"
                        opacity="0.6"
                      />

                      {/* Checkmark */}
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M8 12l3 3 5-5"
                        className="animate-draw"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                      />
                    </g>
                  </svg>
                </div>

                {/* Safety Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div
                    className={`text-center p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } shadow-lg`}
                  >
                    <div className="text-2xl font-bold text-blue-600">
                      99.9%
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Safe Rides
                    </div>
                  </div>
                  <div
                    className={`text-center p-4 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } shadow-lg`}
                  >
                    <div className="text-2xl font-bold text-green-600">
                      24/7
                    </div>
                    <div
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialCarousel />

      {/* App Download Section */}
      <div
        className={`py-20 px-4 ${
          isDarkMode
            ? "bg-gray-800"
            : "bg-gradient-to-br from-blue-50 to-purple-50"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
          >
            Ride Anytime, Anywhere
          </h2>
          <p
            className={`text-xl mb-12 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Download our app and get moving in minutes
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="text-2xl">🍎</span>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg flex items-center space-x-2 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span className="text-2xl">🤖</span>
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Start;
