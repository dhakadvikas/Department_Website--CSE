import React from "react";
import { motion } from "framer-motion";
import vision from "../../assets/vision.AVIF"; // Assuming you have a vision image in your assets
import mission from "../../assets/mission.AVIF"; // Assuming you have a mission image in your assets
const VisionMission = () => {
  return (
    <motion.section 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="mb-16"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Vision Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 rounded-full bg-blue-100 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 -mb-10 -ml-10 rounded-full bg-indigo-100 opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <img 
              src={vision}
              alt="Vision" 
              className="w-20 h-20 object-cover rounded-full mr-6 border-4 border-white shadow-md"
            />
            <h3 className="text-3xl font-bold text-blue-800">Our Vision</h3>
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed">
            To be recognized globally as a premier center for computer science education and research, 
            cultivating innovative leaders who drive technological advancement and make meaningful 
            contributions to society through computing excellence.
          </p>
        </div>
      </div>
      
      {/* Mission Card */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 -mt-8 -mr-8 rounded-full bg-purple-100 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 -mb-10 -ml-10 rounded-full bg-pink-100 opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <img 
              src={mission}
              alt="Mission" 
              className="w-20 h-20 object-cover rounded-full mr-6 border-4 border-white shadow-md"
            />
            <h3 className="text-3xl font-bold text-purple-800">Our Mission</h3>
          </div>
          
          <ul className="text-gray-700 text-lg leading-relaxed space-y-2">
            <li className="flex items-start">
              <span className=" w-5 h-5 rounded-full bg-purple-200 text-purple-800 mr-3 mt-1 flex-shrink-0 flex items-center justify-center text-xs font-bold">1</span>
              <span>Provide high-quality education that blends theoretical foundations with practical applications</span>
            </li>
            <li className="flex items-start">
              <span className=" w-5 h-5 rounded-full bg-purple-200 text-purple-800 mr-3 mt-1 flex-shrink-0 flex items-center justify-center text-xs font-bold">2</span>
              <span>Foster a culture of research, innovation, and entrepreneurship</span>
            </li>
            <li className="flex items-start">
              <span className=" w-5 h-5 rounded-full bg-purple-200 text-purple-800 mr-3 mt-1 flex-shrink-0 flex items-center justify-center text-xs font-bold">3</span>
              <span>Develop industry-ready professionals with strong ethical values and leadership skills</span>
            </li>
            <li className="flex items-start">
              <span className=" w-5 h-5 rounded-full bg-purple-200 text-purple-800 mr-3 mt-1 flex-shrink-0 flex items-center justify-center text-xs font-bold">4</span>
              <span>Facilitate collaboration between academia, industry, and society</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </motion.section>
  );
};

export default VisionMission;
