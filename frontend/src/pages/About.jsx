import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TestimonialCarousel from "../components/home/TestimonialCarousel";
import { Users, Star, Shield, Clock, Globe, Heart } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock data - Move to separate file in production
const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Visionary leader with 15+ years in transportation technology.",
    quote:
      "Innovation drives us forward, but customer satisfaction keeps us going.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    bio: "Tech enthusiast revolutionizing urban mobility.",
    quote: "Technology should simplify lives, not complicate them.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Head of Operations",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    bio: "Expert in scaling operations across global markets.",
    quote: "Efficiency with a human touch is our priority.",
  },
];

const MILESTONES = [
  {
    year: 2020,
    title: "Company Founded",
    description: "Started with a vision to revolutionize urban transportation.",
    icon: "🚀",
  },
  {
    year: 2021,
    title: "1 Million Rides",
    description: "Reached our first million rides milestone.",
    icon: "🎯",
  },
  {
    year: 2022,
    title: "Global Expansion",
    description: "Expanded to 50+ cities worldwide.",
    icon: "🌍",
  },
  {
    year: 2023,
    title: "Innovation Award",
    description: "Recognized for our sustainable transportation solutions.",
    icon: "🏆",
  },
];

const VALUES = [
  {
    title: "Safety First",
    description: "Your security is our top priority.",
    icon: "🛡️",
  },
  {
    title: "Reliability",
    description: "Count on us, anytime, anywhere.",
    icon: "⭐",
  },
  {
    title: "Innovation",
    description: "Constantly evolving for better service.",
    icon: "💡",
  },
  {
    title: "Sustainability",
    description: "Committed to a greener future.",
    icon: "🌱",
  },
];

const AWARDS = [
  {
    title: "Best Ride-Sharing App 2023",
    organization: "Tech Innovation Awards",
    logo: "/awards/tech-innovation.png",
  },
  {
    title: "Customer Excellence",
    organization: "Global Service Awards",
    logo: "/awards/customer-excellence.png",
  },
];

const About = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("company");
  const timelineRef = useRef(null);
  const valuesRef = useRef(null);

  const features = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Community Driven",
      description: "Join thousands of satisfied riders and drivers",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: "Quality Service",
      description: "Rated 4.8/5 by our users",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Safe & Secure",
      description: "Your safety is our top priority",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "24/7 Available",
      description: "Round the clock service",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Global Reach",
      description: "Operating in multiple cities",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Customer First",
      description: "Dedicated to your satisfaction",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  useEffect(() => {
    // Set initial opacity for all animated elements
    gsap.set(
      [
        ".hero-content",
        ".team-member",
        timelineRef.current.children,
        valuesRef.current.children,
      ],
      {
        opacity: 1,
      }
    );

    // Timeline animations
    const timelineItems = timelineRef.current.children;
    gsap.from(timelineItems, {
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top center+=100",
      },
    });

    // Values animations
    const valueItems = valuesRef.current.children;
    gsap.from(valueItems, {
      scale: 0.8,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: valuesRef.current,
        start: "top center+=100",
      },
    });

    // Hero section entrance
    gsap.from(".hero-content", {
      y: 30,
      duration: 1,
    });

    // Team section entrance
    gsap.from(".team-member", {
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".team-section",
        start: "top center+=100",
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About Swift Cab
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Revolutionizing urban mobility with safe, reliable, and affordable
            rides for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${feature.gradient}`}
            >
              <div className="p-6 text-white">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <h3 className="ml-4 text-2xl font-bold">{feature.title}</h3>
                </div>
                <p className="text-white/90 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            To provide seamless transportation solutions while prioritizing
            safety, reliability, and customer satisfaction. We're committed to
            making urban mobility accessible to all.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "1M+", label: "Happy Riders" },
            { number: "50K+", label: "Professional Drivers" },
            { number: "100+", label: "Cities Covered" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm dark:bg-gray-800/50"
            >
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
