import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const DateTimePicker = ({ isScheduled, scheduledTime, onScheduleToggle, onTimeChange }) => {
  const [minDateTime, setMinDateTime] = useState("");
  const [maxDateTime, setMaxDateTime] = useState("");

  useEffect(() => {
    // Set minimum time to current time + 30 minutes
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    setMinDateTime(now.toISOString().slice(0, 16)); // Format: YYYY-MM-DDThh:mm

    // Set maximum time to 7 days from now
    const max = new Date();
    max.setDate(max.getDate() + 7);
    setMaxDateTime(max.toISOString().slice(0, 16));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Schedule Ride</h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isScheduled}
            onChange={(e) => onScheduleToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            {isScheduled ? "Scheduled" : "Ride Now"}
          </span>
        </label>
      </div>

      {isScheduled && (
        <div className="animate-fadeIn">
          <input
            type="datetime-local"
            value={scheduledTime || ""}
            onChange={(e) => onTimeChange(e.target.value)}
            min={minDateTime}
            max={maxDateTime}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <p className="mt-2 text-sm text-gray-500">
            * You can schedule a ride up to 7 days in advance
          </p>
        </div>
      )}
    </div>
  );
};

DateTimePicker.propTypes = {
  isScheduled: PropTypes.bool.isRequired,
  scheduledTime: PropTypes.string,
  onScheduleToggle: PropTypes.func.isRequired,
  onTimeChange: PropTypes.func.isRequired,
};

export default DateTimePicker; 