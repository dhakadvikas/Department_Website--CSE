import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import graduation from "../../assets/graduation.jpg";
import { FaChartLine, FaHandshake, FaGraduationCap, FaBriefcase, FaIndustry, FaStar } from "react-icons/fa";

const AboutPlacement = () => {
  const [placementData, setPlacementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/placementData");
        setPlacementData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching placement data:", err);
        setError("Failed to load placement information. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback data in case API fails or for initial render
  const fallbackData = {
    title: "Training & Placement Cell",
    description: "Connecting talented students with industry leaders since 1986",
    highlights: [
      { stat: "92%", label: "Placement Rate" },
      { stat: "120+", label: "Companies" },
      { stat: "42 LPA", label: "Highest Package" }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={graduation}
            alt="Students in placement interview" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
        </div>
        
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {loading ? fallbackData.title : placementData?.title || fallbackData.title}
            </h1>
            <div className="h-1 bg-yellow-400 rounded-full w-24 mx-auto mb-6"></div>
            <p className="md:text-xl text-gray-100 max-w-3xl mx-auto">
              {loading ? fallbackData.description : placementData?.description || fallbackData.description}
            </p>
            
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left Column - About */}
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-1 bg-blue-700 mr-4"></div>
                    <h2 className="text-3xl font-bold  text-gray-800">About Our Placement Cell</h2>
                  </div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    The <span className="font-semibold text-blue-800">Training & Placement Cell</span> at UIT-RGPV plays a crucial role in connecting students with job opportunities from reputed firms and emerging startups. It bridges the gap between industry requirements and student capabilities.
                  </p>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    Our dedicated team works tirelessly to provide students with platforms for using their potential to gain valuable experience by working in various industries, companies, and startups. We maintain strong relationships with corporate partners to ensure our students get the best opportunities.
                  </p>

                  <div className="grid grid-cols-1 justify-self-center gap-4 gap-y-5 mt-12">
                    <div className="flex items-start">
                      <FaHandshake className="text-blue-700 text-3xl mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold text-xl text-gray-800">Industry Connections</h4>
                        <p className="text-md text-gray-600">Strong network with 500+ companies</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaGraduationCap className="text-blue-700 text-3xl mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold text-xl text-gray-800">Career Guidance</h4>
                        <p className="text-md text-gray-600">Mentorship from industry experts</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaBriefcase className="text-blue-700 text-3xl mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold text-xl text-gray-800">Mock Interviews</h4>
                        <p className="text-md text-gray-600">Real-world interview preparation</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FaIndustry className="text-blue-700 text-3xl mt-1 mr-3" />
                      <div>
                        <h4 className="font-semibold text-xl text-gray-800">Industrial Training</h4>
                        <p className="text-md text-gray-600">Practical experience opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Why @ UIT */}
            <div className="md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={graduation}
                    alt="UIT Campus" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h2 className="text-2xl font-bold text-white p-6">Why @ UIT</h2>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-700 text-white">
                          <FaStar />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800">Academic Excellence</h4>
                        <p className="mt-1 text-gray-600">A community dedicated to the achievement of a shared vision of excellence with highly knowledgeable faculty.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-700 text-white">
                          <FaChartLine />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800">Industry Connections</h4>
                        <p className="mt-1 text-gray-600">Strong relationships with renowned companies that regularly visit our campus for recruitment.</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-700 text-white">
                          <FaBriefcase />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-800">Modern Infrastructure</h4>
                        <p className="mt-1 text-gray-600">Well-furnished classrooms, advanced labs, and comfortable hostels create an ideal learning environment.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="italic text-gray-700">
                      "UIT-RGPV ensures the infrastructure you dream of. Everything in the campus is arranged according to students' needs with well-furnished classrooms, advanced labs, and properly maintained facilities."
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default AboutPlacement;