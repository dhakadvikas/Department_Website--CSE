import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaLaptopCode } from "react-icons/fa";
import PSO from "../../assets/PSO.AVIF"; // Adjust the path as necessary
const PSOsPEOs = () => {
  return (
    <motion.section 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="mb-16"
  >
    <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-8 relative">
        <img 
          src={PSO}
          alt="Educational Outcomes" 
          className="w-full h-48 object-cover rounded-xl mb-6 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-indigo-900/60 rounded-xl flex items-center justify-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Program Outcomes & Objectives</h2>
            <p className="text-white/90 mt-2">Defining the educational goals and expected outcomes for our students</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* PSO Section */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-indigo-800 mb-4 flex items-center">
            <span className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <FaGraduationCap className="text-indigo-600" />
            </span>
            Program Specific Outcomes
          </h3>
          
          <div className="space-y-4">
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-1">PSO1 - Professional Skills</h4>
              <p className="text-gray-700">Design, develop and implement computing solutions in areas like AI, system software, and cybersecurity</p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-1">PSO2 - Problem-Solving</h4>
              <p className="text-gray-700">Apply industry-standard practices to analyze, design and build high-quality software products</p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-700 mb-1">PSO3 - Innovation & Research</h4>
              <p className="text-gray-700">Utilize modern computing tools to create innovative solutions and pursue research opportunities</p>
            </div>
          </div>
        </div>
        
        {/* PEO Section */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
            <span className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <FaLaptopCode className="text-purple-600" />
            </span>
            Program Educational Objectives
          </h3>
          
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-700 mb-1">PEO1 - Technical Competence</h4>
              <p className="text-gray-700">Develop technical expertise and problem-solving abilities in the field of computer science</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-700 mb-1">PEO2 - Professional Growth</h4>
              <p className="text-gray-700">Adapt to emerging technologies through continuous learning and professional development</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-700 mb-1">PEO3 - Ethics & Leadership</h4>
              <p className="text-gray-700">Demonstrate ethical practices, leadership qualities, and societal responsibility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
  );
};

export default PSOsPEOs;
