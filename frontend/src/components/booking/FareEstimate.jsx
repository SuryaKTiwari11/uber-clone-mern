import PropTypes from "prop-types";
import gsap from "gsap";
import { useEffect } from "react";

// Dummy data for development - Move to separate file in production
const MOCK_FARE_DETAILS = {
  baseFare: 100,
  distance: 5.2,
  pricePerKm: 12,
  surgeMultiplier: 1.2,
  taxes: 0.18, // 18% tax
  additionalCharges: {
    serviceFee: 20,
    platformFee: 15,
  },
};

const FareEstimate = ({ distance, fare, rideType }) => {
  useEffect(() => {
    // Entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(".fare-container", {
      opacity: 0,
      y: 20,
      duration: 0.6,
    }).to(".fare-container", {
      opacity: 1,
      duration: 0.1,
    });
  }, []);

  // Use real data if available, otherwise use mock data for development
  const fareDetails = {
    baseFare: rideType?.basePrice || MOCK_FARE_DETAILS.baseFare,
    distance: distance || MOCK_FARE_DETAILS.distance,
    pricePerKm: rideType?.pricePerKm || MOCK_FARE_DETAILS.pricePerKm,
    surgeMultiplier: MOCK_FARE_DETAILS.surgeMultiplier,
    taxes: MOCK_FARE_DETAILS.taxes,
    additionalCharges: MOCK_FARE_DETAILS.additionalCharges,
  };

  // Calculate fare breakdown
  const baseFare = fareDetails.baseFare;
  const distanceFare = (fareDetails.distance * fareDetails.pricePerKm).toFixed(2);
  const subtotal = parseFloat(baseFare) + parseFloat(distanceFare);
  const surgeAmount = ((subtotal * fareDetails.surgeMultiplier) - subtotal).toFixed(2);
  const serviceFee = fareDetails.additionalCharges.serviceFee;
  const platformFee = fareDetails.additionalCharges.platformFee;
  const taxes = ((subtotal + parseFloat(surgeAmount) + serviceFee + platformFee) * fareDetails.taxes).toFixed(2);
  const total = (
    subtotal +
    parseFloat(surgeAmount) +
    serviceFee +
    platformFee +
    parseFloat(taxes)
  ).toFixed(2);

  return (
    <div className="fare-container space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Fare Breakdown</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Fare</span>
          <span className="font-medium">₹{baseFare}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Distance ({fareDetails.distance} km × ₹{fareDetails.pricePerKm}/km)
          </span>
          <span className="font-medium">₹{distanceFare}</span>
        </div>
        {parseFloat(surgeAmount) > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Surge Price</span>
            <span className="font-medium text-orange-600">₹{surgeAmount}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Service Fee</span>
          <span className="font-medium">₹{serviceFee}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Platform Fee</span>
          <span className="font-medium">₹{platformFee}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxes & Fees (18%)</span>
          <span className="font-medium">₹{taxes}</span>
        </div>
        <div className="h-px bg-gray-200 my-2" />
        <div className="flex justify-between text-base font-semibold">
          <span>Total Fare</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center text-sm text-blue-700">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-medium">Dynamic Pricing</p>
            <p className="text-xs mt-1">
              Final fare may vary based on traffic, demand, and waiting time.
              {parseFloat(surgeAmount) > 0 && " Surge pricing is currently active."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

FareEstimate.propTypes = {
  distance: PropTypes.number,
  fare: PropTypes.number,
  rideType: PropTypes.shape({
    name: PropTypes.string,
    basePrice: PropTypes.number,
    pricePerKm: PropTypes.number,
  }),
};

// Default props for development
FareEstimate.defaultProps = {
  distance: MOCK_FARE_DETAILS.distance,
  fare: MOCK_FARE_DETAILS.baseFare,
  rideType: {
    name: "Test Ride",
    basePrice: MOCK_FARE_DETAILS.baseFare,
    pricePerKm: MOCK_FARE_DETAILS.pricePerKm,
  },
};

export default FareEstimate; 