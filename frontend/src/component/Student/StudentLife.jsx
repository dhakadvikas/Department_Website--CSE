import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaAward, FaLaptop, FaChalkboardTeacher } from 'react-icons/fa';
import student_working from '../../assets/student_working.AVIF'; // Adjust the path as necessary
const StudentLife = () => {
  const features = [
    {
      icon: <FaStar />,
      title: "Academic Excellence",
      description: "Our curriculum is designed to challenge and inspire, with a focus on both theoretical foundations and practical applications."
    },
    {
      icon: <FaAward />,
      title: "Skill Development",
      description: "Regular workshops, hackathons, and coding challenges to enhance your technical and soft skills."
    },
    {
      icon: <FaLaptop />,
      title: "State-of-art Labs",
      description: "Access to high-performance computing labs, specialized software, and latest hardware technologies."
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Expert Faculty",
      description: "Learn from experienced professors with backgrounds in research and industry."
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-3 text-gray-800 flex items-center gap-2">
        <span className="w-10 h-1 bg-amber-500 rounded-full"></span>
        Student Life at CSE
      </h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {/* Flex container for content and image */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column - content */}
            <div className="flex-1 my-auto">
              <p className="text-gray-600 mb-8">
                Life as a Computer Science student at UIT RGPV is exciting, challenging, and rewarding. From immersive classroom experiences to hands-on projects, our department offers a comprehensive environment that prepares you for the rapidly evolving tech industry.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Right column - image */}
            <div className="lg:w-2/5">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative overflow-hidden h-[400px] rounded-xl"
              >
                <img 
                  src={student_working}
                  alt="Students working together" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xl font-bold text-white">Learning through collaboration</p>
                  <p className="text-white/80">Students working on a group project in our computer lab</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StudentLife;