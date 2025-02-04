import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import gsap from "gsap";
import { Button } from "../components/ui/Button";
import { UserDataContext } from "../context/UserContext";
import React from "react";

const vehicleIcons = {
  bike: (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6-2a2 2 0 104 0m-4 0a2 2 0 114 0M7 11h10l-2-6H9L7 11z"
      />
    </svg>
  ),
  auto: (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7h8m-8 5h8m-4-9v4m0 0l-4 4m4-4l4 4"
      />
    </svg>
  ),
  car: (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l2-6h10l2 6m0 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m0 0h14"
      />
    </svg>
  ),
};

const RideConfirmation = ({
  ride: propRide,
  driver: propDriver,
  onConfirm,
  onBack,
}) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const driverRef = useRef(null);
  const detailsRef = useRef(null);
  const { user } = useContext(UserDataContext);

  const [ride, setRide] = useState(
    propRide || JSON.parse(localStorage.getItem("selectedRide")) || null
  );
  const [driver, setDriver] = useState(
    propDriver || (ride && ride.driver) || null
  );

  useEffect(() => {
    // Only run animations if we have ride data
    if (ride && driver) {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
      })
        .from(mapRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
        })
        .from(driverRef.current, {
          opacity: 0,
          x: -20,
          duration: 0.4,
        })
        .from(detailsRef.current, {
          opacity: 0,
          x: 20,
          duration: 0.4,
        });

      // Pulsing animation for driver location
      gsap.to(".driver-marker", {
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 1,
      });
    } else {
      // If no ride data, redirect to home
      navigate("/home");
    }
  }, [ride, driver, navigate]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      // Store ride details for payment page
      const rideDetails = {
        pickup: "Your pickup location", // You should get this from your app state
        drop: "Your drop location", // You should get this from your app state
        distance: 5.2, // Calculate this based on locations
        time: ride.time,
        fare: parseFloat(ride.price.replace("₹", "")), // Convert price string to number
      };

      localStorage.setItem("rideDetails", JSON.stringify(rideDetails));
      navigate("/payment");
    }
  };

  // Add this function to render the icon safely
  const renderIcon = (icon) => {
    if (typeof icon === "string") {
      return <span>{icon}</span>;
    }
    // If it's an SVG or other React element, clone it with a key
    return React.cloneElement(icon, { key: "vehicle-icon" });
  };

  // Show loading state instead of null
  if (!ride || !driver) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div
        ref={containerRef}
        className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full"
      >
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-700 flex items-center"
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
            Back to rides
          </button>
        </div>

        {/* Map Section */}
        <div ref={mapRef} className="h-48 bg-gray-200 rounded-lg mb-6 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-600">Google Maps Integration</p>
          </div>
          <div className="driver-marker absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-4 w-4 bg-blue-500 rounded-full" />
          </div>
        </div>

        {/* Driver Info */}
        <div
          ref={driverRef}
          className="flex items-center p-4 bg-gray-50 rounded-lg mb-6"
        >
          <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mr-4">
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{driver.name}</h3>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-gray-600">
                {driver.rating} • {driver.trips} trips
              </span>
            </div>
          </div>
        </div>

        {/* Ride Details */}
        <div ref={detailsRef} className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                {ride.iconType && vehicleIcons[ride.iconType]}
              </div>
              <div>
                <h3 className="font-semibold">{ride.name}</h3>
                <p className="text-sm text-gray-600">{ride.vehicle?.plate}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{ride.price}</p>
              <p className="text-sm text-gray-600">{ride.time} mins away</p>
            </div>
          </div>

          <Button
            onClick={handleConfirm}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Confirm {ride.name}
          </Button>
        </div>
      </div>
    </div>
  );
};

RideConfirmation.propTypes = {
  ride: PropTypes.shape({
    name: PropTypes.string,
    iconType: PropTypes.string,
    price: PropTypes.string,
    time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    vehicle: PropTypes.shape({
      plate: PropTypes.string,
    }),
  }),
  driver: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
    rating: PropTypes.number,
    trips: PropTypes.number,
  }),
  onConfirm: PropTypes.func,
  onBack: PropTypes.func,
};

export default RideConfirmation;
