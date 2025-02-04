import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Button } from "../components/ui/Button";

// Mock data - Move to separate file in production
const SAVED_CARDS = [
  {
    id: 1,
    type: "visa",
    number: "****-****-****-4242",
    expiry: "12/24",
    name: "John Doe",
    isDefault: true,
  },
  {
    id: 2,
    type: "mastercard",
    number: "****-****-****-5555",
    expiry: "09/25",
    name: "John Doe",
    isDefault: false,
  },
];

const SAVED_UPI = [
  {
    id: 1,
    name: "Google Pay",
    id: "john@okicici",
    isDefault: true,
  },
  {
    id: 2,
    name: "PhonePe",
    id: "9876543210@ybl",
    isDefault: false,
  },
];

const WALLETS = [
  {
    name: "Paytm",
    balance: 2500,
    icon: "🔵",
  },
  {
    name: "Google Pay",
    balance: 1800,
    icon: "🟡",
  },
];

const FARE_DETAILS = {
  baseFare: 150,
  distanceFare: 200,
  surge: 50,
  tax: 40,
  total: 440,
};

const TRANSACTION_HISTORY = [
  {
    id: 1,
    date: "2024-03-15",
    amount: 440,
    method: "UPI",
    status: "success",
  },
  {
    id: 2,
    date: "2024-03-12",
    amount: 320,
    method: "Card",
    status: "success",
  },
];

const TRIP_DETAILS = {
  id: "TRIP-2024-03-15-001",
  pickup: "Central Park",
  dropoff: "Times Square",
  distance: "3.2 km",
  duration: "15 mins",
  driver: {
    name: "Michael Chen",
    rating: 4.8,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    carDetails: {
      model: "Toyota Camry",
      color: "Silver",
      number: "NYC 2024",
    },
  },
  timestamp: "15 Mar 2024, 2:30 PM",
};

const PaymentPage = () => {
  const navigate = useNavigate();
  const [activeMethod, setActiveMethod] = useState("card");
  const [showNewCard, setShowNewCard] = useState(false);
  const [isVerifyingUPI, setIsVerifyingUPI] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [selectedCard, setSelectedCard] = useState(SAVED_CARDS[0]?.id);
  const [transactionFilter, setTransactionFilter] = useState("all");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    saveCard: true,
  });

  const [newUPI, setNewUPI] = useState({
    id: "",
    isVerified: false,
  });

  useEffect(() => {
    // Set initial opacity
    gsap.set(".payment-container", { opacity: 1 });

    // Entrance animation
    gsap.from(".payment-container", {
      y: 20,
      duration: 0.6,
    });
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/payment-success");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyUPI = async () => {
    setIsVerifyingUPI(true);
    try {
      // Simulate UPI verification
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNewUPI((prev) => ({ ...prev, isVerified: true }));
    } finally {
      setIsVerifyingUPI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="payment-container max-w-6xl mx-auto px-4">
        {/* Trip Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Trip Details
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {TRIP_DETAILS.id}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Route Info */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-600"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Pickup
                  </div>
                  <div className="text-gray-800 dark:text-white font-medium">
                    {TRIP_DETAILS.pickup}
                  </div>
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Dropoff
                  </div>
                  <div className="text-gray-800 dark:text-white font-medium">
                    {TRIP_DETAILS.dropoff}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-300">
                <span>Distance: {TRIP_DETAILS.distance}</span>
                <span>•</span>
                <span>Duration: {TRIP_DETAILS.duration}</span>
              </div>
            </div>

            {/* Driver & Car Info */}
            <div className="flex space-x-4">
              <img
                src={TRIP_DETAILS.driver.photo}
                alt={TRIP_DETAILS.driver.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  {TRIP_DETAILS.driver.name}
                </h3>
                <div className="flex items-center space-x-1 text-sm">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {TRIP_DETAILS.driver.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {TRIP_DETAILS.driver.carDetails.color}{" "}
                  {TRIP_DETAILS.driver.carDetails.model}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {TRIP_DETAILS.driver.carDetails.number}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {TRIP_DETAILS.timestamp}
              </span>
              <button
                onClick={() => window.print()}
                className="text-blue-600 dark:text-blue-400 text-sm hover:underline flex items-center space-x-1"
              >
                <span>Download Receipt</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Choose Payment Method
              </h2>

              {/* Payment Method Tabs */}
              <div className="flex flex-wrap gap-4 mb-8">
                {["card", "upi", "wallet", "cash"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setActiveMethod(method)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      activeMethod === method
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {method.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Card Payment Section */}
              {activeMethod === "card" && (
                <div className="space-y-6">
                  {/* Saved Cards */}
                  {SAVED_CARDS.map((card) => (
                    <label
                      key={card.id}
                      className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <input
                        type="radio"
                        name="card"
                        checked={selectedCard === card.id}
                        onChange={() => setSelectedCard(card.id)}
                        className="text-blue-600"
                      />
                      <div className="ml-4">
                        <p className="font-medium text-gray-800 dark:text-white">
                          {card.type.toUpperCase()} {card.number}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Expires {card.expiry}
                        </p>
                      </div>
                      {card.isDefault && (
                        <span className="ml-auto text-sm text-blue-600 dark:text-blue-400">
                          Default
                        </span>
                      )}
                    </label>
                  ))}

                  {/* Add New Card Button */}
                  <button
                    onClick={() => setShowNewCard(true)}
                    className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    + Add New Card
                  </button>
                </div>
              )}

              {/* UPI Payment Section */}
              {activeMethod === "upi" && (
                <div className="space-y-6">
                  {/* Saved UPI IDs */}
                  {SAVED_UPI.map((upi) => (
                    <div
                      key={upi.id}
                      className="p-4 border rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {upi.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {upi.id}
                        </p>
                      </div>
                      {upi.isDefault && (
                        <span className="text-sm text-blue-600 dark:text-blue-400">
                          Default
                        </span>
                      )}
                    </div>
                  ))}

                  {/* New UPI ID Input */}
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newUPI.id}
                      onChange={(e) =>
                        setNewUPI((prev) => ({ ...prev, id: e.target.value }))
                      }
                      placeholder="Enter UPI ID (e.g., name@upi)"
                      className="flex-grow px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <Button
                      onClick={verifyUPI}
                      disabled={isVerifyingUPI || !newUPI.id}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      {isVerifyingUPI ? "Verifying..." : "Verify UPI"}
                    </Button>
                  </div>

                  {/* QR Code Option */}
                  <button
                    onClick={() => setShowQR(true)}
                    className="w-full py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  >
                    Show QR Code to Pay
                  </button>
                </div>
              )}

              {/* Wallet Section */}
              {activeMethod === "wallet" && (
                <div className="space-y-6">
                  {WALLETS.map((wallet) => (
                    <div
                      key={wallet.name}
                      className="p-4 border rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{wallet.icon}</span>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {wallet.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Balance: ₹{wallet.balance}
                          </p>
                        </div>
                      </div>
                      <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Add Money
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Cash Payment Section */}
              {activeMethod === "cash" && (
                <div className="p-6 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-800 dark:text-white font-medium">
                      Pay with Cash
                    </p>
                    <span className="text-2xl">💵</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Please keep exact change ready for a smoother experience.
                  </p>
                </div>
              )}
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Recent Transactions
              </h2>
              <div className="space-y-4">
                {TRANSACTION_HISTORY.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        ₹{transaction.amount}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.date} • {transaction.method}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        transaction.status === "success"
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fare Details Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Fare Details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Base Fare</span>
                  <span>₹{FARE_DETAILS.baseFare}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Distance Fare</span>
                  <span>₹{FARE_DETAILS.distanceFare}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Surge Price</span>
                  <span>₹{FARE_DETAILS.surge}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax</span>
                  <span>₹{FARE_DETAILS.tax}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-semibold text-gray-800 dark:text-white">
                    <span>Total Amount</span>
                    <span>₹{FARE_DETAILS.total}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="pt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Pay Button */}
                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {loading ? "Processing..." : `Pay ₹${FARE_DETAILS.total}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Card Modal */}
      {showNewCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Add New Card
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  maxLength="19"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength="4"
                    placeholder="***"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newCard.saveCard}
                  onChange={(e) =>
                    setNewCard((prev) => ({
                      ...prev,
                      saveCard: e.target.checked,
                    }))
                  }
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Save card for future payments
                </span>
              </label>
              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  onClick={() => setShowNewCard(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Card
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Scan QR Code to Pay
            </h3>
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              {/* Replace with actual QR code component */}
              <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Scan this QR code using any UPI app to make the payment
            </p>
            <Button
              onClick={() => setShowQR(false)}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
