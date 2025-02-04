import { useEffect, useRef } from "react";
import gsap from "gsap";

// Mock testimonials - Move to separate file in production
const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Best cab service I've ever used! Always on time and professional.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    location: "New York",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    comment: "Great experience every time. Clean cars and friendly drivers.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    location: "San Francisco",
  },
  {
    id: 3,
    name: "Emma Wilson",
    rating: 4,
    comment: "Reliable and affordable. The app is super easy to use!",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    location: "Chicago",
  },
];

const TestimonialCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const cards = carouselRef.current.children;

    // Initial animation with timeline
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Set initial opacity to 1 before animation
    gsap.set(cards, { opacity: 1 });

    tl.from(cards, {
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: carouselRef.current,
        start: "top center+=100",
      },
    });

    // Auto-scroll animation
    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1),
      duration: 15,
      ease: "none",
      repeat: -1,
      scrollTrigger: {
        trigger: carouselRef.current,
        start: "top center",
        toggleActions: "play pause resume pause",
      },
    });
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
          What Our Riders Say
        </h2>
        <div className="overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-6 transition-transform duration-500"
          >
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {testimonial.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
