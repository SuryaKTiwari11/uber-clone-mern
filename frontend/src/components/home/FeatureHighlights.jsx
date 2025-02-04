import { useEffect, useRef } from "react";
import gsap from "gsap";

const FEATURES = [
  {
    id: 1,
    icon: "🚗",
    title: "Fast & Reliable Rides",
    description: "Get to your destination quickly and safely, every time.",
  },
  {
    id: 2,
    icon: "🔒",
    title: "Safe & Secure Payments",
    description: "Multiple payment options with end-to-end encryption.",
  },
  {
    id: 3,
    icon: "🌍",
    title: "Available in Multiple Cities",
    description: "Find us in major cities across the country.",
  },
  {
    id: 4,
    icon: "⭐",
    title: "Highly Rated Drivers",
    description: "Professional, vetted drivers for a premium experience.",
  },
];

const FeatureHighlights = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const features = featuresRef.current.children;

    // Set initial opacity to 1
    gsap.set(features, { opacity: 1 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(features, {
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: featuresRef.current,
        start: "top center+=100",
      },
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          Why Choose Swift Cab?
        </h2>
        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;
