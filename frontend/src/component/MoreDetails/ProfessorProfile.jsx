
import React from "react";
import { motion } from "framer-motion";
import { FiX, FiMail, FiPhone, FiGlobe, FiBriefcase, FiAward, FiBookOpen, FiUsers, FiFileText } from "react-icons/fi";

const ProfessorProfile = ({ data, setFaculty }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0  bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white/60 rounded-2xl p-8 shadow-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto 
        scrollbar-hide" 
        style={{ 
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
        }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-indigo-900">Faculty Profile</h2>
            <p className="text-gray-500">Academic and contact information</p>
          </div>
          <button 
            onClick={() => setFaculty((prev) => !prev)}
            className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close profile"
          >
            <FiX className="text-2xl text-gray-600" />
          </button>
        </div>
        
        {/* Profile Header */}
        <div className="text-center bg-indigo-50 rounded-xl p-6 mb-6">
          <h2 className="text-3xl font-bold text-indigo-900 mb-2">{data.name}</h2>
          <p className="text-lg text-indigo-700 font-medium">{data.designation}</p>
          <p className="text-gray-600 mt-1">{data.department}</p>
          <p className="text-gray-500 text-sm mt-1">{data.address}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center mb-3">
            <FiMail className="text-indigo-600 mr-2 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
          </div>
          
          <div className="ml-7 space-y-2">
            <p className="flex items-center">
              <span className="text-gray-600 w-16">Email:</span>
              <a href={`mailto:${data.contact?.email}`} className="text-indigo-600 hover:underline ml-2">
                {data.contact?.email}
              </a>
            </p>
            
            <p className="flex items-center">
              <span className="text-gray-600 w-16">Phone:</span>
              <span className="ml-2">{data.contact?.phone}</span>
            </p>
            
            <p className="flex items-center">
              <span className="text-gray-600 w-16">Mobile:</span>
              <span className="ml-2">{data.contact?.mobile}</span>
            </p>
            
            {data.contact?.website && (
              <p className="flex items-center">
                <span className="text-gray-600 w-16">Website:</span>
                <a 
                  href={data.contact.website} 
                  className="text-indigo-600 hover:underline ml-2 flex items-center" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FiGlobe className="mr-1" /> Visit Website
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center mb-3">
            <FiBriefcase className="text-indigo-600 mr-2 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
          </div>
          <p className="text-gray-700 ml-7">{data.experience}</p>
        </div>

        {/* Education */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center mb-3">
            <FiAward className="text-indigo-600 mr-2 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800">Education</h3>
          </div>
          <ul className="space-y-2 ml-7">
            {data.education_qualification?.map((edu, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-indigo-800">{edu.qualification}</span>
                <span className="text-gray-700"> - {edu.specialization}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Memberships */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center mb-3">
            <FiUsers className="text-indigo-600 mr-2 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800">Professional Memberships</h3>
          </div>
          <ul className="space-y-2 ml-7">
            {data.memberships?.map((membership, index) => (
              <li key={index} className="text-gray-700 flex">
                <span className="text-indigo-500 mr-2">•</span>
                {membership}
              </li>
            ))}
          </ul>
        </div>

        {/* Publications */}
        <div className="mb-6 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex items-center mb-3">
            <FiFileText className="text-indigo-600 mr-2 text-xl" />
            <h3 className="text-xl font-semibold text-gray-800">Selected Publications</h3>
          </div>
          <ul className="space-y-3 ml-7">
            {data.publications?.slice(0, 5).map((pub, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-indigo-800">{pub.title}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {pub.journal}, {pub.year}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button 
            onClick={() => setFaculty((prev) => !prev)}
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors flex items-center justify-center"
          >
            <FiX className="mr-2" />
            Close Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfessorProfile;