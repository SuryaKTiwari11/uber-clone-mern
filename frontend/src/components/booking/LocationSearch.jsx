import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";

const LocationSearch = ({
  pickup,
  dropoff,
  onPickupChange,
  onDropoffChange,
  onSwap = () => {},
  suggestions = [],
  userLocation = "Your current location",
}) => {
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(".location-input", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.2,
    }).to(".location-input", {
      opacity: 1,
      duration: 0.1,
    });
  }, []);

  const handleSuggestionClick = (value, isPickup) => {
    if (isPickup) {
      onPickupChange(value);
      setShowPickupSuggestions(false);
    } else {
      onDropoffChange(value);
      setShowDropoffSuggestions(false);
    }
  };

  const handleUseCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In production, reverse geocode these coordinates
            onPickupChange(userLocation || "Your current location");
            setShowPickupSuggestions(false);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }
    } catch (error) {
      console.error("Location error:", error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Where would you like to go?
      </h2>

      {/* Pickup Location */}
      <div className="relative location-input">
        <div className="absolute inset-y-0 left-3 flex items-center">
          <div className="h-2 w-2 bg-green-500 rounded-full" />
        </div>
        <input
          type="text"
          value={pickup}
          onChange={(e) => onPickupChange(e.target.value)}
          onFocus={() => setShowPickupSuggestions(true)}
          placeholder="Enter pickup location"
          className="w-full pl-8 pr-24 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
        />
        <button
          onClick={handleUseCurrentLocation}
          disabled={isLoadingLocation}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {isLoadingLocation ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-4 w-4 mr-1"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Locating...
            </span>
          ) : (
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Use my location
            </span>
          )}
        </button>
        {showPickupSuggestions && pickup && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            {suggestions
              .filter((s) => s.toLowerCase().includes(pickup.toLowerCase()))
              .map((suggestion) => (
                <div
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion, true)}
                  className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {suggestion}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Drop Location */}
      <div className="relative location-input">
        <div className="absolute inset-y-0 left-3 flex items-center">
          <div className="h-2 w-2 bg-red-500 rounded-full" />
        </div>
        <input
          type="text"
          value={dropoff}
          onChange={(e) => onDropoffChange(e.target.value)}
          onFocus={() => setShowDropoffSuggestions(true)}
          placeholder="Enter drop location"
          className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all"
        />
        {showDropoffSuggestions && dropoff && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            {suggestions
              .filter((s) => s.toLowerCase().includes(dropoff.toLowerCase()))
              .map((suggestion) => (
                <div
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion, false)}
                  className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {suggestion}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Swap Button */}
      <button
        onClick={onSwap}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="Swap locations"
      >
        <svg
          className="w-5 h-5 text-gray-600 dark:text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      </button>
    </div>
  );
};

LocationSearch.propTypes = {
  pickup: PropTypes.string.isRequired,
  dropoff: PropTypes.string.isRequired,
  onPickupChange: PropTypes.func.isRequired,
  onDropoffChange: PropTypes.func.isRequired,
  onSwap: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  userLocation: PropTypes.string,
};

export default LocationSearch;
