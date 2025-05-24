import React from "react";
import { motion } from "framer-motion";

function Card({ heading, content, icon }) {
  return (
    <motion.div 
      whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="mx-2 h-[22em] px-5 py-6 flex flex-col justify-center items-center 
                bg-white rounded-xl overflow-hidden shadow-md
                border-t-4 border-blue-600 relative"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 z-0"></div>
      
      {/* Icon */}
      <div className="text-3xl text-blue-600 mb-5 transform transition-transform duration-300 
                    hover:scale-110 z-10">
        {icon}
      </div>
      
      {/* Content */}
      <div className="z-10 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-3">
          {heading}
        </h3>
        
        <p className="text-slate-600 leading-relaxed">
          {content}
        </p>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
    </motion.div>
  );
} 

export default Card;