import React from 'react';
import { motion } from 'framer-motion';
import graduation from '../../assets/graduation.jpg'; // Adjust the path as necessary
const StudentHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-900 to-blue-800 text-white py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Text content */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">Student Life</span> at CSE Department
            </h1>
            <p className="text-lg text-blue-100 mb-6">
              Experience the perfect blend of academic excellence, innovation, and vibrant campus life in our Computer Science & Engineering Department.
            </p>
            
          </motion.div>
          
          {/* Image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-indigo-500 rounded-3xl blur-md opacity-30"></div>
              <img 
              src={graduation}
                alt="Students collaborating" 
                className="rounded-2xl relative shadow-lg object-cover h-[400px] w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentHero;