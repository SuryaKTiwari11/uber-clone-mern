import PropTypes from "prop-types";

const RideTypeSelector = ({ rideTypes, selectedRide, onSelect, distance }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Select Ride Type
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rideTypes.map((ride) => {
          const estimatedFare = distance
            ? (ride.basePrice + ride.pricePerKm * distance).toFixed(2)
            : null;

          return (
            <div
              key={ride.id}
              onClick={() => onSelect(ride.id)}
              className={`ride-type p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                selectedRide === ride.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{ride.icon}</span>
                <div
                  className={`h-3 w-3 rounded-full ${
                    selectedRide === ride.id ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              </div>
              <h4 className="font-semibold text-gray-800">{ride.name}</h4>
              {estimatedFare ? (
                <div className="mt-2 text-sm">
                  <span className="text-gray-600">Estimated: </span>
                  <span className="font-medium">₹{estimatedFare}</span>
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-500">
                  Base fare: ₹{ride.basePrice}
                </div>
              )}
              <div className="mt-1 text-xs text-gray-500">
                {ride.eta} mins away
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

RideTypeSelector.propTypes = {
  rideTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      basePrice: PropTypes.number.isRequired,
      pricePerKm: PropTypes.number.isRequired,
      eta: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedRide: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  distance: PropTypes.number,
};

export default RideTypeSelector;
