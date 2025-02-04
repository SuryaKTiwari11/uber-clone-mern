import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Button } from "../components/ui/Button";
import { Phone, Mail, MessageSquare, MapPin, Clock, Send } from "lucide-react";

// Mock FAQ data - Move to separate file in production
const FAQ_CATEGORIES = {
  ride: {
    title: "Ride Issues",
    icon: "🚗",
    questions: [
      {
        q: "What if my driver cancels?",
        a: "If your driver cancels, we'll automatically find you a new driver. You won't be charged any cancellation fee.",
      },
      {
        q: "How do I report items left in the cab?",
        a: "Go to 'Your Rides' section, select the ride, and click 'Report Lost Item'. Our support team will help you connect with the driver.",
      },
    ],
  },
  payment: {
    title: "Payments",
    icon: "💳",
    questions: [
      {
        q: "Why was I charged a cancellation fee?",
        a: "Cancellation fees apply if you cancel after a driver has been assigned and is en route to your location.",
      },
      {
        q: "How do I add a new payment method?",
        a: "Go to 'Payment Methods' in your profile settings and click 'Add New Payment Method'.",
      },
    ],
  },
  account: {
    title: "Account",
    icon: "👤",
    questions: [
      {
        q: "How do I change my phone number?",
        a: "Visit your profile settings, click on 'Edit Profile', and update your phone number. Verification required.",
      },
      {
        q: "How do I delete my account?",
        a: "Contact our support team for account deletion. Note that this action cannot be undone.",
      },
    ],
  },
  safety: {
    title: "Safety",
    icon: "🛡️",
    questions: [
      {
        q: "What safety features are available during rides?",
        a: "We offer real-time ride tracking, SOS button, and share ride details feature for all rides.",
      },
      {
        q: "How do I report a safety concern?",
        a: "Use the 'Report Safety Issue' button or contact our 24/7 safety response team.",
      },
    ],
  },
};

const ISSUE_TYPES = [
  "Ride Issue",
  "Payment Problem",
  "Account Help",
  "Safety Concern",
  "Other",
];

const HelpSupport = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [helpfulAnswers, setHelpfulAnswers] = useState(new Set());
  const [unhelpfulAnswers, setUnhelpfulAnswers] = useState(new Set());
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    subject: "",
    message: "",
    files: [],
  });

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8 text-white" />,
      title: "Phone Support",
      description: "24/7 Dedicated Helpline",
      info: "+1 (555) 123-4567",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Mail className="w-8 h-8 text-white" />,
      title: "Email Support",
      description: "Get Response within 24hrs",
      info: "support@swiftcab.com",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-white" />,
      title: "Live Chat",
      description: "Instant Support",
      info: "Available 24/7",
      gradient: "from-green-500 to-teal-500",
    },
  ];

  const officeLocations = [
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: "Main Office",
      description: "123 Business Avenue, Tech City",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Business Hours",
      description: "Monday - Friday: 9AM - 6PM",
      gradient: "from-red-500 to-pink-500",
    },
  ];

  useEffect(() => {
    // Set initial opacity
    gsap.set(".help-container", { opacity: 1 });

    // Entrance animation
    gsap.from(".help-container", {
      y: 20,
      duration: 0.6,
    });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory(null);
  };

  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleHelpful = (questionId, isHelpful) => {
    if (isHelpful) {
      setHelpfulAnswers((prev) => new Set([...prev, questionId]));
      setUnhelpfulAnswers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    } else {
      setUnhelpfulAnswers((prev) => new Set([...prev, questionId]));
      setHelpfulAnswers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // In production, send to server
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setShowEmailForm(false);
      // Show success message
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFAQs = searchQuery
    ? Object.values(FAQ_CATEGORIES).flatMap((category) =>
        category.questions.filter(
          (q) =>
            q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            We're here to help you with anything you need
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${method.gradient}`}
            >
              <div className="p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    {method.icon}
                  </div>
                  <h3 className="ml-4 text-2xl font-bold">{method.title}</h3>
                </div>
                <p className="text-white/90 mb-2">{method.description}</p>
                <p className="text-white font-semibold">{method.info}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="issueType"
              >
                Issue Type
              </label>
              <select
                id="issueType"
                required
                value={formData.issueType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    issueType: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select an issue type</option>
                {ISSUE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
                placeholder="Subject"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Attachments
              </label>
              <div className="flex flex-wrap gap-4">
                {formData.files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-xs">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData((prev) => ({
                          ...prev,
                          files: prev.files.filter((_, i) => i !== index),
                        }));
                      }}
                      className="ml-2 text-red-500 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <label className="flex items-center justify-center w-12 h-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 dark:hover:border-purple-400">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <svg
                    className="w-6 h-6 text-gray-400"
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
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </div>

        {/* Office Locations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {officeLocations.map((location, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${location.gradient}`}
            >
              <div className="p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    {location.icon}
                  </div>
                  <h3 className="ml-4 text-2xl font-bold">{location.title}</h3>
                </div>
                <p className="text-white/90">{location.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
