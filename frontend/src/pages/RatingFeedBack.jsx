import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Button } from "../components/ui/Button";

// Mock data - Move to separate file in production
const MOCK_RIDE_DETAILS = {
  id: "RIDE123",
  date: "2024-03-15",
  time: "14:30",
  driver: {
    name: "John Smith",
    rating: 4.8,
    trips: 1250,
  },
  vehicle: {
    model: "Toyota Camry",
    number: "ABC 123",
    color: "Silver",
  },
  fare: 350,
};

const COMMON_ISSUES = [
  "Driver was late",
  "Car was unclean",
  "Unfriendly driver",
  "AC not working",
  "Route was longer than expected",
  "Driver was on phone while driving",
];

const SERIOUS_ISSUES = [
  "Reckless driving",
  "Overcharging",
  "Driver refused ride",
  "Safety concerns",
  "Harassment",
];

const RatingFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [feedback, setFeedback] = useState({
    overallRating: 0,
    driverRating: 0,
    cleanlinessRating: 0,
    safetyRating: 0,
    comment: "",
    selectedIssues: [],
    seriousIssues: [],
    rideAgain: null,
    fairFare: null,
    recommend: null,
    images: [],
  });

  useEffect(() => {
    // Set initial opacity
    gsap.set(".feedback-container", { opacity: 1 });

    // Entrance animation
    gsap.from(".feedback-container", {
      y: 20,
      duration: 0.6,
    });
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setFeedback((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // In production, send feedback to server
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/feedback-success");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ value, onChange, size = "lg" }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`${
            size === "lg" ? "text-3xl" : "text-2xl"
          } transition-transform hover:scale-110 focus:outline-none`}
        >
          {star <= value ? "⭐" : "☆"}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="feedback-container max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        {/* Ride Details Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Rate Your Ride
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <p>Date: {MOCK_RIDE_DETAILS.date}</p>
              <p>Time: {MOCK_RIDE_DETAILS.time}</p>
              <p>Driver: {MOCK_RIDE_DETAILS.driver.name}</p>
            </div>
            <div>
              <p>Vehicle: {MOCK_RIDE_DETAILS.vehicle.model}</p>
              <p>Number: {MOCK_RIDE_DETAILS.vehicle.number}</p>
              <p>Fare: ₹{MOCK_RIDE_DETAILS.fare}</p>
            </div>
          </div>
        </div>

        {/* Rating Form */}
        <div className="p-6 space-y-8">
          {/* Overall Rating */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Overall Experience
            </h2>
            <StarRating
              value={feedback.overallRating}
              onChange={(value) =>
                setFeedback((prev) => ({ ...prev, overallRating: value }))
              }
            />
          </div>

          {/* Driver Ratings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Rate Your Driver
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Behavior
                </p>
                <StarRating
                  value={feedback.driverRating}
                  onChange={(value) =>
                    setFeedback((prev) => ({ ...prev, driverRating: value }))
                  }
                  size="md"
                />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Cleanliness
                </p>
                <StarRating
                  value={feedback.cleanlinessRating}
                  onChange={(value) =>
                    setFeedback((prev) => ({
                      ...prev,
                      cleanlinessRating: value,
                    }))
                  }
                  size="md"
                />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">Safety</p>
                <StarRating
                  value={feedback.safetyRating}
                  onChange={(value) =>
                    setFeedback((prev) => ({ ...prev, safetyRating: value }))
                  }
                  size="md"
                />
              </div>
            </div>
          </div>

          {/* Common Issues */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Any Issues?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {COMMON_ISSUES.map((issue) => (
                <label
                  key={issue}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={feedback.selectedIssues.includes(issue)}
                    onChange={(e) =>
                      setFeedback((prev) => ({
                        ...prev,
                        selectedIssues: e.target.checked
                          ? [...prev.selectedIssues, issue]
                          : prev.selectedIssues.filter((i) => i !== issue),
                      }))
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {issue}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Serious Issues */}
          <div>
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
              Report Serious Issues
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SERIOUS_ISSUES.map((issue) => (
                <label
                  key={issue}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={feedback.seriousIssues.includes(issue)}
                    onChange={(e) =>
                      setFeedback((prev) => ({
                        ...prev,
                        seriousIssues: e.target.checked
                          ? [...prev.seriousIssues, issue]
                          : prev.seriousIssues.filter((i) => i !== issue),
                      }))
                    }
                    className="w-4 h-4 text-red-600"
                  />
                  <span className="text-red-600 dark:text-red-400">
                    {issue}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Questions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Additional Feedback
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Would you ride with this driver again?
                </p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={feedback.rideAgain === true}
                      onChange={() =>
                        setFeedback((prev) => ({ ...prev, rideAgain: true }))
                      }
                      className="text-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={feedback.rideAgain === false}
                      onChange={() =>
                        setFeedback((prev) => ({ ...prev, rideAgain: false }))
                      }
                      className="text-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">No</span>
                  </label>
                </div>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Was the fare reasonable?
                </p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={feedback.fairFare === true}
                      onChange={() =>
                        setFeedback((prev) => ({ ...prev, fairFare: true }))
                      }
                      className="text-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={feedback.fairFare === false}
                      onChange={() =>
                        setFeedback((prev) => ({ ...prev, fairFare: false }))
                      }
                      className="text-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">No</span>
                  </label>
                </div>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Would you recommend Swift Cab?
                </p>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={feedback.recommend === true}
                      onChange={() =>
                        setFeedback((prev) => ({ ...prev, recommend: true }))
                      }
                      className="text-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={feedback.recommend === false}
                      onChange={() =>
                        setFeedback((prev) => ({ ...prev, recommend: false }))
                      }
                      className="text-blue-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Comment */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Additional Comments
            </h2>
            <textarea
              value={feedback.comment}
              onChange={(e) =>
                setFeedback((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Share your experience..."
              className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Upload Images
            </h2>
            <div className="flex flex-wrap gap-4">
              {feedback.images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() =>
                      setFeedback((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                      }))
                    }
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={() => setShowConfirmation(true)}
              disabled={isSubmitting || !feedback.overallRating}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Submit Feedback?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to submit your feedback? This cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmation(false);
                  handleSubmit();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingFeedback;
