import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoStar, IoStarOutline } from "react-icons/io5";

const TestimonialCarousel = () => {
  const api = import.meta.env.VITE_API_URL || '';
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/feedback`);
        
        // Process the API response to ensure we have an array
        let testimonialArray;
        if (Array.isArray(response.data)) {
          testimonialArray = response.data;
        } else if (response.data && typeof response.data === 'object') {
          // If it's an object with results/data/items property
          if (response.data.results) testimonialArray = response.data.results;
          else if (response.data.data) testimonialArray = response.data.data;
          else if (response.data.items) testimonialArray = response.data.items;
          // If no recognizable array property, convert object values to array
          else testimonialArray = Object.values(response.data);
        } else {
          // Fallback to empty array if data is null/undefined or unexpected format
          testimonialArray = [];
        }
        
        // Filter out testimonials without feedback text
        const validTestimonials = testimonialArray.filter(item => 
          item && (item.feedback || item.message) && item.name
        );
        
        setTestimonials(validTestimonials);
        setError(null);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Unable to load testimonials. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, [api]);

  // Auto advance testimonial
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // 6 seconds per testimonial
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Render star ratings
  const RatingStars = ({ rating = 5 }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="text-amber-400">
            {index < rating ? <IoStar /> : <IoStarOutline />}
          </span>
        ))}
      </div>
    );
  };

  // If there are no testimonials but we're not loading, show placeholder content
  if (!loading && testimonials.length === 0 && !error) {
    return (
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">What People Say About Us</h2>
        <div className="bg-white rounded-xl p-8 shadow-md">
          <p className="text-gray-500 italic">No testimonials available yet. Be the first to share your experience!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">What People Say About Us</h2>
        
        {testimonials.length > 1 && (
          <div className="flex space-x-2">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="text-indigo-600 text-xl" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="text-indigo-600 text-xl" />
            </button>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="h-64 flex items-center justify-center bg-red-50 rounded-xl p-6">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <div className="relative h-[280px] md:h-[240px]">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                index === currentIndex && (
                  <motion.div
                    key={testimonial._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-white rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4 flex items-center">
                        <div className="flex-shrink-0 relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                          <p className="text-sm text-gray-500">
                            {testimonial.role || "Student"} • {new Date(testimonial.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                          <div className="mt-1">
                            <RatingStars rating={testimonial.rating || 5} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-grow overflow-auto">
                        <blockquote className="text-gray-700 italic text-lg">
                          "{testimonial.feedback || testimonial.message}"
                        </blockquote>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
          
          {testimonials.length > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;