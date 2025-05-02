
import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/mainCs.jpeg";
import { FaChevronDown } from "react-icons/fa";

function Welcome() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggeredFadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const highlightText = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Hero Background with Overlay */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <img 
          src={backgroundImage} 
          alt="CSE Department Background" 
          loading="eager"
          fetchpriority="high"
          width="1200"
          height="600"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/70 to-indigo-900/80 backdrop-blur-[1px]"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 md:px-10">
        {/* Main Heading Animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggeredFadeIn}
          className="text-center mb-16"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-4xl md:text-7xl font-bold tracking-tight mb-6"
          >
            <motion.span variants={highlightText} className="inline-block text-blue-400 filter drop-shadow-lg">Innovate.</motion.span>{" "}
            <motion.span variants={highlightText} className="inline-block text-cyan-300 filter drop-shadow-lg">Create.</motion.span>{" "}
            <motion.span variants={highlightText} className="inline-block text-indigo-300 filter drop-shadow-lg">Transform.</motion.span>
          </motion.h1>
          
          <motion.h2 
            variants={fadeIn}
            className="text-xl md:text-4xl font-semibold text-white/90 mb-4"
          >
            Department of Computer Science & Engineering
          </motion.h2>
          
          <motion.p 
            variants={fadeIn}
            className="md:text-xl text-sm text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering future innovators through cutting-edge education, groundbreaking research, 
            and technological excellence since 1987
          </motion.p>

          <motion.div 
            variants={fadeIn}
            className="mt-8"
          >
            <NavLink 
              to={"/about"}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300">
             
              Explore Programs
            </NavLink>
          </motion.div>
        </motion.div>

        {/* Additional info paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-base text-gray-300 max-w-2xl text-center absolute bottom-24"
        >
          Shaping the future through computing excellence and technological innovation at UIT-RGPV, Bhopal
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center"
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <a 
          href="#about" 
          className="text-white/70 hover:text-white/90 transition-colors p-2"
          aria-label="Scroll down to learn more"
        >
          <FaChevronDown className="w-6 h-6" />
        </a>
      </motion.div>
    </section>
  );
}

export default Welcome;