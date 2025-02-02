import { useState, useEffect, useRef } from "react";
import { Button } from "../components/ui/Button";
import gsap from "gsap";
import VehicleOptions from "../pages/VehicleOptions";


const Home = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const searchPanelRef = useRef(null);
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initial setup - hide search panel
    gsap.set(searchPanelRef.current, {
      x: "-100%",
      opacity: 0,
    });
    gsap.set(mapRef.current, {
      width: "100%",
      x: 0,
    });
  }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);

    if (!isPanelOpen) {
      // Open panel animation
      gsap.to(searchPanelRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(mapRef.current, {
        width: "66.666667%", // 8/12 columns
        x: "33.333333%", // Push map to align with grid
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      // Close panel animation
      gsap.to(searchPanelRef.current, {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(mapRef.current, {
        width: "100%",
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleLocationSubmit = () => {
    if (fromLocation && toLocation) {
      setShowVehicleOptions(true);
    }
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    // Here you would typically make an API call to request the ride
  };

  return (
    <div
      className="min-h-screen mt-8 mb-16 bg-gray-100 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="grid grid-cols-12 h-screen">
        {/* Search Panel - Left Side */}
        <div
          ref={searchPanelRef}
          className="col-span-4 bg-white p-8 shadow-lg absolute left-0 h-full z-10 transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="max-w-lg mx-auto">
            {!showVehicleOptions ? (
              <>
                <h1 className="text-2xl font-bold text-blue-600 mb-8 transition-all duration-300 hover:scale-105">
                  Where would you like to go?
                </h1>

                <div className="space-y-6">
                  <div className="relative transform transition-transform duration-200 hover:scale-102">
                    <div className="absolute inset-y-0 left-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="3" strokeWidth="2" />
                        <path
                          strokeWidth="2"
                          d="M12 2v2m0 16v2M2 12h2m16 0h2"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter pickup location"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                    />
                  </div>

                  <div className="relative transform transition-transform duration-200 hover:scale-102">
                    <div className="absolute inset-y-0 left-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth="2"
                          d="M12 22s8-10 8-14a8 8 0 0 0-16 0c0 4 8 14 8 14z"
                        />
                        <circle cx="12" cy="8" r="3" strokeWidth="2" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter destination"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                    />
                  </div>

                  <Button
                    onClick={handleLocationSubmit}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    disabled={!fromLocation || !toLocation}
                  >
                    Find Rides
                  </Button>
                </div>

                {isSearchFocused && (
                  <div className="mt-8 animate-fadeIn">
                    <p className="text-sm text-gray-600 font-medium mb-3">
                      Recent locations
                    </p>
                    <div className="space-y-3">
                      {[
                        "Work - 123 Business St",
                        "Home - 456 Home Ave",
                        "Gym - 789 Fitness Rd",
                      ].map((location, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-md cursor-pointer transition-all duration-200 transform hover:scale-102 hover:shadow-sm"
                        >
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-700">{location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="animate-fadeIn">
                <button
                  onClick={() => setShowVehicleOptions(false)}
                  className="mb-4 flex items-center text-blue-600 hover:text-blue-700"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to search
                </button>
                <VehicleOptions onSelect={handleVehicleSelect} />
              </div>
            )}
          </div>
        </div>

        {/* Map View - Right Side */}
        <div
          ref={mapRef}
          className="col-span-12 bg-gray-200 relative cursor-pointer transition-all duration-300"
          onClick={togglePanel}
        >
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-2xl font-bold">
            Map View (Google Maps Integration)
            {!isPanelOpen && (
              <div className="absolute top-4 left-4 bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
