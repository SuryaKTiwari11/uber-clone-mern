import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocationSearch from "../components/booking/LocationSearch";
import TestimonialCarousel from "../components/home/TestimonialCarousel";
import FeatureHighlights from "../components/home/FeatureHighlights";

import { Button } from "../components/ui/Button";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock data - Move to separate file in production
const MOCK_LOCATIONS = [
  "Central Park",
  "Times Square",
  "Brooklyn Bridge",
  "Grand Central",
  "Empire State",
  "Statue of Liberty",
];

const MOCK_RIDE_TYPES = [
  {
    id: "economy",
    name: "Economy",
    icon: "🚗",
    basePrice: 100,
    pricePerKm: 12,
    eta: "3-5",
  },
  {
    id: "premium",
    name: "Premium",
    icon: "🚙",
    basePrice: 150,
    pricePerKm: 15,
    eta: "4-6",
  },
  {
    id: "luxury",
    name: "Luxury",
    icon: "🚘",
    basePrice: 200,
    pricePerKm: 20,
    eta: "5-8",
  },
  {
    id: "suv",
    name: "SUV",
    icon: "🚓",
    basePrice: 180,
    pricePerKm: 18,
    eta: "4-7",
  },
  {
    id: "bike",
    name: "Bike",
    icon: "🏍️",
    basePrice: 50,
    pricePerKm: 8,
    eta: "2-4",
  },
];

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const heroRef = useRef(null);
  const carRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In production, reverse geocode these coordinates
          setUserLocation("Your current location");
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }

    // Hero section animations with timeline
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Initial animations
    tl.from(".hero-title", {
      opacity: 0,
      y: 50,
      duration: 1,
    })
      .to(".hero-title", { opacity: 1, duration: 0.1 })
      .from(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        "-=0.5"
      )
      .to(".hero-subtitle", { opacity: 1, duration: 0.1 })
      .from(
        ".search-container",
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.3"
      )
      .to(".search-container", { opacity: 1, duration: 0.1 });

    // Car animation on scroll (separate timeline)
    gsap.to(carRef.current, {
      x: "100vw",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Floating effect for the title (separate from opacity)
    gsap.to(".hero-title", {
      y: "10px",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const handleFindRide = () => {
    if (pickup && dropoff) {
      navigate("/booking", { state: { pickup, dropoff } });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSwapLocations = () => {
    const tempPickup = pickup;
    setPickup(dropoff);
    setDropoff(tempPickup);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 overflow-hidden"
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>

        {/* Moving Car */}
        <div
          ref={carRef}
          className="absolute bottom-20 left-[-100px] w-20 h-20"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {/* Car SVG path */}
            <path d="M5 13l1.5-4.5h11L19 13m-1.5 5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m-11 0A1.5 1.5 0 015 16.5 1.5 1.5 0 016.5 15 1.5 1.5 0 018 16.5 1.5 1.5 0 016.5 18M18 13H6m12 0v3H6v-3" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h1 className="hero-title text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              Swift Cab
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Your Reliable Ride, Anytime, Anywhere
            </p>
          </div>

          {/* Search Container */}
          <div className="search-container max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
            <LocationSearch
              pickup={pickup}
              dropoff={dropoff}
              onPickupChange={setPickup}
              onDropoffChange={setDropoff}
              onSwap={handleSwapLocations}
              suggestions={MOCK_LOCATIONS}
              userLocation={userLocation}
            />
            <Button
              onClick={handleFindRide}
              disabled={!pickup || !dropoff}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Find a Ride
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <FeatureHighlights />

      {/* Testimonials Section */}
      <TestimonialCarousel />
    </div>
  );
};

export default Home;
