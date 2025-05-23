import React, { useState, useEffect } from "react";
import { IoCall, IoMail, IoLocationSharp, IoSend } from "react-icons/io5";
import { FiMessageSquare, FiChevronRight } from "react-icons/fi";
import axios from "axios";

import TestimonialCarousel from "../../component/Testimonial/TestimonialCarousel.jsx";

function Contact() {
const api = import.meta.env.VITE_API_URL || '';

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

    

// Update the useEffect that fetches feedbacks to properly handle the data type
useEffect(() => {
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${api}/feedback`);
      // console.log("Original response:", response.data);
      
      // Ensure feedbacks is always an array
      let feedbackArray;
      if (Array.isArray(response.data)) {
        feedbackArray = response.data;
      } else if (response.data && typeof response.data === 'object') {
        // If it's an object with results/data/items property
        if (response.data.results) feedbackArray = response.data.results;
        else if (response.data.data) feedbackArray = response.data.data;
        else if (response.data.items) feedbackArray = response.data.items;
        // If no recognizable array property, convert object values to array
        else feedbackArray = Object.values(response.data);
      } else {
        // Fallback to empty array if data is null/undefined or unexpected format
        feedbackArray = [];
      }
      
      // console.log("Converted to array:", feedbackArray);
      setFeedbacks(feedbackArray);
      
    } catch (error) {
      // console.error("Error fetching feedback:", error);
      setFeedbacks([]); // Set empty array on error
    }
  };
  
  fetchFeedbacks();
}, [api, setFeedbacks]);


  // console.log(typeof(feedbacks))
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const setRating = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    try {
      // First ensure our formData uses consistent field names
      const formDataToSubmit = {
        ...formData,
        // If your backend expects 'feedback' instead of 'message'
        feedback: formData.feedback || formData.message
      };
      
      await axios.post(`${api}/feedback`, formDataToSubmit);
      console.log("Submitting form data:", formDataToSubmit);
     
      setSubmitStatus({
        type: "success",
        message: "Thank you! Your feedback has been submitted successfully."
      });
      
      // Reset form with the correct field name
      setFormData({
        name: "",
        email: "",
        feedback: "", // Use feedback consistently
        rating: 5
      });
      
      // Refresh feedback list and properly process the response
      const response = await axios.get(`${api}/feedback`);
      
      // Process the response similar to how the useEffect does it
      let updatedFeedbacks;
      if (Array.isArray(response.data)) {
        updatedFeedbacks = response.data;
      } else if (response.data && typeof response.data === 'object') {
        // If it's an object with results/data/items property
        if (response.data.results) updatedFeedbacks = response.data.results;
        else if (response.data.data) updatedFeedbacks = response.data.data;
        else if (response.data.items) updatedFeedbacks = response.data.items;
        // If no recognizable array property, convert object values to array
        else updatedFeedbacks = Object.values(response.data);
      } else {
        // Fallback to empty array if data is null/undefined or unexpected format
        updatedFeedbacks = [];
      }
      
      console.log("Received feedback after submission:", updatedFeedbacks);
      setFeedbacks(updatedFeedbacks);
      
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again later."
      });
      console.error("Error submitting feedback:", error);
    } finally {
      setLoading(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 5000);
    }
  };

  const nextFeedback = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevFeedback = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
    );
  };

  // Auto scroll through feedback every 5 seconds
  useEffect(() => {
    if (feedbacks.length <= 1) return;
    
    const interval = setInterval(() => {
      nextFeedback();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [feedbacks, currentIndex]);

 

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-tr from-gray-600 via-indigo-900 to-gray-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Have questions or feedback? We'd love to hear from you. Reach out to our team.
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6 -mt-10">
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Address Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <IoLocationSharp className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600">
              University Institute of Technology, RGPV<br />
              Airport Bypass Road, Gandhi Nagar,<br />
              Bhopal - 462 036 (M.P.) India
            </p>
            <a 
              href="https://www.google.com/maps/place/University+Institute+of+Technology+RGPV/@23.3101737,77.3594687,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View on Map <FiChevronRight className="ml-1" />
            </a>
          </div>
          
          {/* Email Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <IoMail className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">
              Send us an email anytime and we'll get back to you as soon as possible.
            </p>
            <a 
              href="mailto:uit_director@rgtu.net"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              uit_director@rgtu.net
            </a>
          </div>
          
          {/* Phone Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <IoCall className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">
              Mon-Fri from 9:00 AM to 5:00 PM
            </p>
            <a 
              href="tel:+91-(0755)-2678812"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              +91-(0755)-2678812
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FiMessageSquare className="text-xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Send Us a Message</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-2 text-left font-bold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 text-left font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 text-left font-bold">Message</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition resize-none"
                  required
                ></textarea>
              </div>
              
            
              
              {submitStatus.message && (
                <div className={`p-3 rounded-lg ${submitStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center transition-colors duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <IoSend className="mr-2" />
                )}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          
          {/* Feedback Carousel */}

          <TestimonialCarousel/>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">What are the admission requirements?</h3>
              <p className="text-gray-600">Admission requirements vary by program. Please visit our Admissions page or contact the admissions office directly for specific program requirements.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Are there scholarships available?</h3>
              <p className="text-gray-600">Yes, we offer various scholarships based on merit, need, and specific criteria. Check our Financial Aid section for more details.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">How can I schedule a campus tour?</h3>
              <p className="text-gray-600">You can schedule a campus tour by contacting our admissions office or filling out the campus visit request form on our website.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">What career services do you offer?</h3>
              <p className="text-gray-600">We provide career counseling, resume workshops, job fairs, internship placements, and alumni networking opportunities to help students succeed professionally.</p>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  );
}

export default Contact;