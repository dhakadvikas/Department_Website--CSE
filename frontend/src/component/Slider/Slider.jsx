import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaCode, FaRobot, FaServer, FaLaptopCode, FaUserGraduate } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import { MdOutlineSecurity, MdDevices } from "react-icons/md";
import labs1 from "../../assets/Labs1.jpg";
import labs2 from "../../assets/Labs2.jpg"; 
import labs3 from "../../assets/Labs3.jpg";
import labs4 from "../../assets/Labs4.jpg";
import project1 from "../../assets/project1.jpg";
import project2 from "../../assets/project2.jpg";
import project3 from "../../assets/project3.jpg";
import project4 from "../../assets/project4.jpg"; 
import excellence1 from "../../assets/excellence1.jpg";
import excellence2 from "../../assets/excellence2.jpg";
import excellence3 from "../../assets/excellence3.jpg";
import excellence4 from "../../assets/excellence4.jpg";

// Sample gallery data - replace with your actual images and descriptions
const galleryData = [
  {
    category: "Labs & Infrastructure",
    items: [
      {
        image:  labs1,
        title: "Advanced Computing Lab",
        description: "Students working on high-performance computing systems and parallel processing projects.",
        icon: <FaServer className="mr-2" />
      },
      {
        image: labs2,
        title: "Software Development Center",
        description: "Modern workspace where students collaborate on software engineering projects using agile methodologies.",
        icon: <FaCode className="mr-2" />
      },
      {
        image: labs3,
        title: "AI & Machine Learning Lab",
        description: "Specialized facility equipped with GPU workstations for deep learning and artificial intelligence research.",
        icon: <FaRobot className="mr-2" />
      },
      {
        image: labs4,
        title: "Cyber Security Lab",
        description: "State-of-the-art facility for network security, cryptography, and ethical hacking training.",
        icon: <MdOutlineSecurity className="mr-2" />
      }
    ]
  },
  {
    category: "Student Projects",
    items: [
      {
        image: project1,
        title: "Annual Hackathon",
        description: "Students participating in the 24-hour coding marathon developing innovative solutions to real-world problems.",
        icon: <FaLaptopCode className="mr-2" />
      },
      {
        image: project2,
        title: "IoT Innovation Lab",
        description: "Smart campus initiatives developed by final year students implementing Internet of Things technology.",
        icon: <MdDevices className="mr-2" />
      },
      {
        image: project3, 
        title: "Blockchain Research Group",
        description: "Student-led team developing decentralized applications and smart contracts on various blockchain platforms.",
        
        icon: <FaLaptopCode className="mr-2" />
      },
      {
        image: project4,
        title: "AI-Generated Art Exhibition",
        description: "Creative computing projects showcasing the intersection of artificial intelligence and digital art.",
        icon: <SiOpenai className="mr-2" />
      }
    ]
  },
  {
    category: "Academic Excellence",
    items: [
      {
        image: excellence1,
        title: "International Conference",
        description: "Faculty and students presenting research papers at the Annual Computer Science & Engineering Conference.",
        icon: <FaUserGraduate className="mr-2" />
      },
      {
        image: excellence2,
        title: "Research Publications",
        description: "Our department's contributions to top-tier journals and conferences in various computing domains.",
        icon: <FaUserGraduate className="mr-2" />
      },
      {
        image:  excellence3,
        title: "Industry Collaboration",
        description: "Joint research initiatives with leading technology companies providing students with real-world experience.",
        icon: <FaUserGraduate className="mr-2" />
      },
      {
        image: excellence4, 
        title: "Faculty Achievements",
        description: "Celebrating our faculty's contributions to the field of computer science and engineering.",
        icon: <FaUserGraduate className="mr-2" />
      }
    ]
  }
];

function CSEGallery() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const nextSlide = () => {
    setActiveSlide((prev) => 
      prev === galleryData[activeCategory].items.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => 
      prev === 0 ? galleryData[activeCategory].items.length - 1 : prev - 1
    );
  };

  const selectCategory = (index) => {
    setActiveCategory(index);
    setActiveSlide(0);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-800/80 to-">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Discover Our Department</h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Explore the cutting-edge facilities, student achievements, and research excellence that define our Computer Science & Engineering Department
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-10 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2 md:space-x-4">
            {galleryData.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => selectCategory(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                  activeCategory === index 
                    ? "bg-blue-500 text-white shadow-lg" 
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {category.category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Gallery Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div 
            layout
            className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl"
          >
            {galleryData[activeCategory].items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: activeSlide === index ? 1 : 0,
                  scale: activeSlide === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.6 }}
                className={`absolute inset-0 ${activeSlide === index ? 'z-10' : 'z-0'}`}
              >
                <div className="relative w-full h-full group">
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  {/* Content Overlay - Always visible */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-transform duration-500">
                    <div className="flex items-center mb-2">
                      {item.icon}
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                  
                  {/* Description - Visible on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/70 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center mb-2">
                      {item.icon}
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    </div>
                    <p className="text-blue-100 text-lg">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Navigation Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <FaChevronLeft />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <FaChevronRight />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
              {galleryData[activeCategory].items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeSlide === index 
                      ? "bg-white w-6" 
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

       
      </div>

      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}
      </style>
    </section>
  );
}

export default CSEGallery;