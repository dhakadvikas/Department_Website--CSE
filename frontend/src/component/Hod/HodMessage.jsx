import React from "react";
import { FaQuoteLeft, FaQuoteRight, FaArrowRight, FaLinkedin } from "react-icons/fa";

const HodMessage = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h5 className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-1">Leadership</h5>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Message from the <span className="text-blue-600">Head of Department</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>
        
        {/* Message Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300">
          <div className="md:flex">
            {/* Profile Section */}
            <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-800 p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transform scale-110 blur-lg opacity-70"></div>
                <img
                  src="https://www.uitrgpv.ac.in/AboutDepartment/FacultyImages/MA_080321113310.jpg"
                  alt="Dr. Manish Kumar Ahirwar"
                  className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg relative z-10"
                />
              </div>
              <h3 className="text-white text-2xl font-bold mb-1">DR. Manish Kumar Ahirwar</h3>
              <p className="text-blue-100 mb-4">Head of Department, CSE</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white text-sm w-full">
                <p className="font-medium mb-2">Ph.D, Computer Science</p>
                <p>20+ years of academic experience</p>
                <p className="mt-2">Expert in Machine Learning & AI</p>
              </div>
              {/* <div className="mt-6 flex space-x-3">
                <a href="#" className="bg-white text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors duration-300">
                  <FaLinkedin size={20} />
                </a>
                <a href="mailto:hodcse@uitrgpv.ac.in" className="bg-white text-gray-800 hover:bg-blue-50 py-2 px-4 rounded-full font-medium text-sm transition-colors duration-300">
                  Contact
                </a>
              </div> */}
            </div>
            
            {/* Message Content */}
            <div className="md:w-2/3 p-6 md:p-10 relative">
              <FaQuoteLeft className="text-gray-200 text-4xl absolute top-6 left-8" />
              
              <div className="md:pl-8 space-y-4 mt-4 md:mt-0 relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Building Tomorrow's Tech Leaders
                </h2>
                
                <p className="text-gray-600 leading-relaxed text-justify">
                  The Department of Computer Science & Engineering at UIT-RGPV stands as a beacon of innovation and excellence 
                  with unwavering commitment to the advancement of technical education in our nation. As one of Central India's 
                  premier institutes, our mission is to cultivate competent engineers who will contribute significantly to 
                  our country's technological progress.
                </p>
                
                <p className="text-gray-600 leading-relaxed text-justify">
                  Through this portal, I extend an invitation to all stakeholders to join us in our pursuit of academic excellence. 
                  I urge our students to uphold the highest standards of discipline and decorum within our institution, 
                  avoiding practices like mass absenteeism and ragging that impede our collective growth.
                </p>
                
                <p className="text-gray-600 leading-relaxed text-justify">
                  With your continued support and dedication, I am confident that we will transform our CSE department 
                  into a world-class center for learning, innovation, and research excellence.
                </p>
                
                <div className="flex justify-end mt-6">
                  <FaQuoteRight className="text-gray-200 text-4xl" />
                </div>
                
                {/* <div className="pt-6 mt-6 border-t border-gray-100 flex justify-between items-center">
                  <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium group transition-colors duration-300">
                    <span>Read full message</span>
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  
                  <div className="flex flex-col items-end">
                    <img 
                      src="data:image/png;base64,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"
                      alt="Signature"
                      className="h-14 mb-1 opacity-80"
                    />
                    <span className="text-sm text-gray-500 italic">April 8, 2025</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HodMessage;