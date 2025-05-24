import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

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
            <div className="md:w-1/3 bg-gradient-to-bl from-blue-500 via-blue-700 to-blue-500 p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transform scale-110 blur-lg opacity-70"></div>
                <img
                  src="https://res.cloudinary.com/dhakad/image/upload/v1748067271/manish_sir_message_tnbvbt.jpg"
                  alt="Dr. Manish Kumar Ahirwar"
                  loading="lazy"
                  className="w-48 h-48   rounded-full border-4 border-white shadow-lg relative z-10 "
                />
              </div>
              <h3 className="text-white text-2xl font-bold mb-1">DR. Manish Kumar Ahirwar</h3>
              <p className="text-blue-100 mb-4">Head of Department, CSE</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white text-sm w-full">
                <p className="font-medium mb-2">Ph.D, Computer Science</p>
                <p>20+ years of academic experience</p>
                <p className="mt-2">Expert in IoT & ML</p>
              </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HodMessage;