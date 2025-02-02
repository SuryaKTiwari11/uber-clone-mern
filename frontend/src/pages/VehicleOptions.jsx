import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../components/ui/Button";
import RideConfirmation from "./RideConfirmation";
import { useNavigate } from "react-router-dom";

const vehicles = [
  {
    id: "bike",
    name: "Bike",
    icon: (
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
    time: "2-3",
    price: "₹40-50",
    description: "Quick rides for one",
    vehicle: {
      plate: "BK 1234",
    },
  },
  {
    id: "auto",
    name: "Auto",
    icon: (
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
    time: "5-7",
    price: "₹80-100",
    description: "Affordable rides for three",
    vehicle: {
      plate: "AU 5678",
    },
  },
  {
    id: "car",
    name: "Car",
    icon: (
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
    time: "7-10",
    price: "₹150-200",
    description: "Comfort rides for four",
    vehicle: {
      plate: "CA 9012",
    },
  },
];

const VehicleOptions = ({ onSelect }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  // Mock driver data
  const mockDriver = {
    name: "John Driver",
    photo: "https://placekitten.com/200/200", // placeholder image
    rating: 4.8,
    trips: 1234,
  };

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleConfirmRide = () => {
    setShowConfirmation(true);
  };

  const handleBack = () => {
    setShowConfirmation(false);
  };

  const handleFinalConfirm = () => {
    localStorage.setItem(
      "selectedRide",
      JSON.stringify({
        ...selectedVehicle,
        driver: mockDriver,
      })
    );
    navigate("/ride-confirmation");
  };

  if (showConfirmation) {
    return (
      <RideConfirmation
        ride={selectedVehicle}
        driver={mockDriver}
        onConfirm={handleFinalConfirm}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Choose your ride
      </h2>
      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          onClick={() => handleVehicleSelect(vehicle)}
          className={`
            flex items-center justify-between p-4 rounded-lg cursor-pointer
            transition-all duration-200 transform hover:scale-[1.02]
            ${
              selectedVehicle?.id === vehicle.id
                ? "bg-blue-50 border-2 border-blue-500"
                : "bg-white border border-gray-200 hover:border-blue-200"
            }
          `}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              {vehicle.icon}
            </div>
            <div>
              <h3 className="font-semibold">{vehicle.name}</h3>
              <p className="text-sm text-gray-600">{vehicle.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">{vehicle.price}</p>
            <p className="text-sm text-gray-600">{vehicle.time} mins</p>
          </div>
        </div>
      ))}

      {selectedVehicle && (
        <Button
          onClick={handleConfirmRide}
          className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Continue with {selectedVehicle.name}
        </Button>
      )}
    </div>
  );
};

VehicleOptions.propTypes = {
  onSelect: PropTypes.func,
};

export default VehicleOptions;
