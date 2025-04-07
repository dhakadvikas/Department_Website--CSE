import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaLaptopCode, FaUsers } from 'react-icons/fa';

const StudentStats = () => {
  const stats = [
    { 
      icon: <FaGraduationCap className="text-3xl" />, 
      value: '98%', 
      label: 'Graduation Rate', 
      color: 'from-amber-500 to-amber-300' 
    },
    { 
      icon: <FaBriefcase className="text-3xl" />, 
      value: '92%', 
      label: 'Placement Rate', 
      color: 'from-blue-500 to-blue-300' 
    },
    { 
      icon: <FaLaptopCode className="text-3xl" />, 
      value: '45+', 
      label: 'Industry Partners', 
      color: 'from-indigo-500 to-indigo-300' 
    },
    { 
      icon: <FaUsers className="text-3xl" />, 
      value: '5000+', 
      label: 'Alumni Network', 
      color: 'from-purple-500 to-purple-300' 
    }
  ];

  return (
    <div className="bg-white py-10 shadow-sm relative -mt-8 z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 mb-4 rounded-full flex items-center justify-center bg-gradient-to-r ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentStats;