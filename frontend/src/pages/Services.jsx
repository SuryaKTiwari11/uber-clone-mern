import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  Bike,
  Users,
  Clock,
  Plane,
  Shield,
  CreditCard,
  PhoneCall,
  Bell,
  Map,
  Share2,
  Calendar,
  MapPin,
  Star,
  Tag,
  Wallet,
  Zap,
  Gift,
  CheckCircle,
  AlertTriangle,
  Building,
  BarChart,
  Globe,
  Accessibility,
  Settings,
} from "lucide-react";

const Services = () => {
  const [activeTab, setActiveTab] = useState("rides");

  // Add gradient colors for cards
  const cardGradients = [
    "from-blue-500 to-indigo-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-teal-500",
    "from-yellow-500 to-orange-500",
    "from-red-500 to-pink-500",
    "from-indigo-500 to-purple-500",
  ];

  const services = {
    rides: [
      {
        icon: <Car className="w-8 h-8 text-white" />,
        title: "Economy",
        description: "Affordable rides for everyday travel",
        price: "Starting from $5",
        gradient: "from-blue-500 to-indigo-500",
      },
      {
        icon: <Car className="w-8 h-8 text-white" />,
        title: "Luxury",
        description: "Premium rides in high-end vehicles",
        price: "Starting from $15",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        icon: <Bike className="w-8 h-8 text-white" />,
        title: "Bike Rides",
        description: "Quick and eco-friendly transportation",
        price: "Starting from $3",
        gradient: "from-green-500 to-teal-500",
      },
      {
        icon: <Users className="w-8 h-8 text-white" />,
        title: "Carpooling",
        description: "Share rides and split costs",
        price: "Starting from $2/person",
        gradient: "from-yellow-500 to-orange-500",
      },
      {
        icon: <Clock className="w-8 h-8 text-white" />,
        title: "Rentals",
        description: "Hourly and daily rental options",
        price: "Starting from $20/hour",
        gradient: "from-red-500 to-pink-500",
      },
      {
        icon: <Plane className="w-8 h-8 text-white" />,
        title: "Airport Transfers",
        description: "Fixed price airport rides",
        price: "Starting from $25",
        gradient: "from-indigo-500 to-purple-500",
      },
    ],
    features: [
      {
        icon: <PhoneCall className="w-8 h-8 text-white" />,
        title: "24/7 Support",
        description: "Round-the-clock customer assistance",
        gradient: "from-blue-500 to-indigo-500",
      },
      {
        icon: <Bell className="w-8 h-8 text-white" />,
        title: "Emergency Button",
        description: "One-tap access to emergency services",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        icon: <Map className="w-8 h-8 text-white" />,
        title: "Live Tracking",
        description: "Real-time ride tracking",
        gradient: "from-green-500 to-teal-500",
      },
      {
        icon: <Share2 className="w-8 h-8 text-white" />,
        title: "Ride Sharing",
        description: "Share ride details with trusted contacts",
        gradient: "from-yellow-500 to-orange-500",
      },
      {
        icon: <Calendar className="w-8 h-8 text-white" />,
        title: "Scheduling",
        description: "Book rides in advance",
        gradient: "from-red-500 to-pink-500",
      },
      {
        icon: <MapPin className="w-8 h-8 text-white" />,
        title: "Multi-Stop",
        description: "Add multiple destinations",
        gradient: "from-indigo-500 to-purple-500",
      },
      {
        icon: <Star className="w-8 h-8 text-white" />,
        title: "Ratings",
        description: "Rate and review your experience",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        icon: <Tag className="w-8 h-8 text-white" />,
        title: "Promos",
        description: "Regular discounts and offers",
        gradient: "from-green-500 to-teal-500",
      },
    ],
    payments: [
      {
        icon: <CreditCard className="w-8 h-8 text-white" />,
        title: "Multiple Payment Options",
        description: "Cards, UPI, and cash payments",
        gradient: "from-blue-500 to-indigo-500",
      },
      {
        icon: <Wallet className="w-8 h-8 text-white" />,
        title: "Wallet System",
        description: "Store credits for quick payments",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        icon: <Zap className="w-8 h-8 text-white" />,
        title: "Surge Pricing",
        description: "Dynamic pricing during peak hours",
        gradient: "from-green-500 to-teal-500",
      },
      {
        icon: <Gift className="w-8 h-8 text-white" />,
        title: "Cashback",
        description: "Earn rewards on every ride",
        gradient: "from-yellow-500 to-orange-500",
      },
    ],
    safety: [
      {
        icon: <CheckCircle className="w-8 h-8 text-white" />,
        title: "Driver Verification",
        description: "Thorough background checks",
        gradient: "from-blue-500 to-indigo-500",
      },
      {
        icon: <Shield className="w-8 h-8 text-white" />,
        title: "Ride Verification",
        description: "Pre-ride safety checks",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        icon: <AlertTriangle className="w-8 h-8 text-white" />,
        title: "SOS Alerts",
        description: "Emergency contact notification",
        gradient: "from-green-500 to-teal-500",
      },
    ],
    business: [
      {
        icon: <Building className="w-8 h-8 text-white" />,
        title: "Corporate Accounts",
        description: "Business travel management",
        gradient: "from-blue-500 to-indigo-500",
      },
      {
        icon: <BarChart className="w-8 h-8 text-white" />,
        title: "Analytics",
        description: "Detailed reporting and insights",
        gradient: "from-purple-500 to-pink-500",
      },
    ],
    additional: [
      {
        icon: <Globe className="w-8 h-8 text-white" />,
        title: "Multi-Language",
        description: "Support for multiple languages",
        gradient: "from-green-500 to-teal-500",
      },
      {
        icon: <Accessibility className="w-8 h-8 text-white" />,
        title: "Accessibility",
        description: "Features for all users",
        gradient: "from-yellow-500 to-orange-500",
      },
      {
        icon: <Settings className="w-8 h-8 text-white" />,
        title: "Preferences",
        description: "Customizable ride options",
        gradient: "from-red-500 to-pink-500",
      },
    ],
  };

  const tabs = [
    { id: "rides", label: "Ride Types" },
    { id: "features", label: "Features" },
    { id: "payments", label: "Payments" },
    { id: "safety", label: "Safety" },
    { id: "business", label: "Business" },
    { id: "additional", label: "More" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Animated Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the perfect ride for every journey
          </p>
        </div>

        {/* Enhanced Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Enhanced Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services[activeTab].map((service, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${
                cardGradients[index % cardGradients.length]
              }`}
            >
              <div className="p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    {service.icon}
                  </div>
                  <h3 className="ml-4 text-2xl font-bold">{service.title}</h3>
                </div>
                <p className="text-white/90 mb-4 text-lg">
                  {service.description}
                </p>
                {service.price && (
                  <p className="text-white font-semibold text-xl mb-4">
                    {service.price}
                  </p>
                )}
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white transition-colors"
                >
                  Learn more
                  <svg
                    className="w-5 h-5 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Ready to get started?
          </h2>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg"
          >
            Book a Ride
            <svg
              className="w-6 h-6 ml-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
