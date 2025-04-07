import React from "react";
import { FaDesktop, FaServer, FaCode, FaDatabase, FaLaptopCode, FaRobot, FaShieldAlt, FaCloud } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AboutBanner from "../../assets/AboutBanner.AVIF";
import DepartmentBanner from "../../assets/DepartmentBanner.jpg";
import IOTLAB from "../../assets/IOTLAB.AVIF";
import Library from "../../assets/library.AVIF";

import AI from "../../assets/AI.AVIF";
import TCS_logo from "../../assets/TCS_logo.svg";
import Cognizant_logo from "../../assets/Cognizant_logo.svg.png";
import IBM_logo from "../../assets/IBM_logo.svg.png";
import Deloitte_logo from "../../assets/Deloitte_logo.jpg";
import Bajaj_logo from "../../assets/Bajaj_logo.svg";
import Tejas_logo from "../../assets/Tejas_logo.svg";
import jaro_education from "../../assets/jaro_education_Logo.png";
import persistent_logo from "../../assets/persistent_logo.png";


const Department = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900">
        <div className="absolute inset-0 opacity-20">
          <img 
            src= {DepartmentBanner}
            alt="Code background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 py-20 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Department of Computer Science & Engineering</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Innovating tomorrow's solutions through cutting-edge education, research, and technology
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Department Overview */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Shaping the Future of Technology</h2>
              <div className="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-700 mb-4">
                Established in 1987, the Department of Computer Science and Engineering has evolved into a 
                center of excellence for education and innovation. We prepare students for the dynamic 
                landscape of computing through a blend of theoretical foundations and practical applications.
              </p>
              <p className="text-gray-700">
                With state-of-the-art laboratories, experienced faculty, and strong industry connections, 
                our department fosters a vibrant ecosystem for learning, research, and professional growth 
                in the rapidly evolving field of computer science.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src={AboutBanner}
                alt="Computer Science Education"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Courses Offered */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Academic Programs</h2>
          <p className="text-gray-600 mb-8">Comprehensive education options to prepare you for success in the tech industry</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                <h3 className="text-xl font-bold text-white">B.Tech</h3>
                <p className="text-blue-100">Computer Science & Engineering</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li>• Duration: 4 years</li>
                  <li>• Intake: 132 students</li>
                  <li>• AICTE approved curriculum</li>
                  <li>• Focus on core CS principles and industry skills</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4">
                <h3 className="text-xl font-bold text-white">M.E./M.Tech</h3>
                <p className="text-purple-100">Computer Science & Engineering</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li>• Duration: 2 years</li>
                  <li>• Intake: 18 students</li>
                  <li>• Advanced specializations</li>
                  <li>• Research opportunities and industry projects</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-4">
                <h3 className="text-xl font-bold text-white">Ph.D.</h3>
                <p className="text-indigo-100">Computer Science & Engineering</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li>• Research focused program</li>
                  <li>• Expert faculty supervision</li>
                  <li>• Publication opportunities</li>
                  <li>• Cutting-edge research domains</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Specialization Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Specialization Areas</h2>
          <p className="text-gray-600 mb-8">Explore focused domains within computer science to develop expertise</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaRobot className="text-3xl text-blue-500" />, title: "Artificial Intelligence & ML", desc: "Neural networks, deep learning, computer vision, and NLP" },
              { icon: <FaShieldAlt className="text-3xl text-red-500" />, title: "Cybersecurity", desc: "Network security, cryptography, and ethical hacking" },
              { icon: <FaDatabase className="text-3xl text-green-500" />, title: "Data Science", desc: "Big data analytics, data mining, and visualization" },
              { icon: <FaCloud className="text-3xl text-purple-500" />, title: "Cloud Computing", desc: "Distributed systems, virtualization, and scalability" },
              { icon: <FaLaptopCode className="text-3xl text-yellow-500" />, title: "Web & Mobile Development", desc: "Full-stack development and cross-platform apps" },
              { icon: <FaDesktop className="text-3xl text-pink-500" />, title: "Computer Graphics", desc: "3D modeling, game development, and visualization" },
              { icon: <FaServer className="text-3xl text-indigo-500" />, title: "Networks & IoT", desc: "Connected systems, protocols, and smart environments" },
              { icon: <FaCode className="text-3xl text-cyan-500" />, title: "Software Engineering", desc: "Design patterns, agile methodologies, and testing" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all hover:shadow-lg">
                <div className="flex items-center mb-4">
                  {item.icon}
                  <h3 className="text-lg font-semibold text-gray-800 ml-3">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">State-of-the-Art Facilities</h2>
          <p className="text-gray-600 mb-8">Our department offers cutting-edge infrastructure to facilitate learning and innovation</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img 
                src={AI}
                alt="Modern Computer Lab" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Computing Labs</h3>
                <p className="text-gray-600">
                  Our labs feature high-performance workstations equipped with the latest hardware and software. 
                  Students have access to NVIDIA GPU clusters for deep learning, specialized development environments, 
                  and industry-standard tools for software engineering, data science, and cybersecurity.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img 
                src={Library}
                alt="Research Library" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Comprehensive Digital Library</h3>
                <p className="text-gray-600">
                  Our department maintains a specialized library with thousands of volumes covering all 
                  aspects of computer science. Students have access to digital subscriptions of prestigious 
                  journals, conference proceedings, e-books, and research databases from IEEE, ACM, Springer, 
                  and other major publishers.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img 
                src={ IOTLAB}
                alt="IoT Lab" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">IoT & Embedded Systems Lab</h3>
                <p className="text-gray-600">
                  A dedicated space for experimenting with Internet of Things technologies, featuring 
                  Arduino, Raspberry Pi, and other microcontroller platforms. The lab is equipped with 
                  sensors, actuators, and networking components for building and testing connected systems.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img 
                src= {Library}
                alt="Collaborative Space" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation & Collaboration Spaces</h3>
                <p className="text-gray-600">
                  Modern, flexible spaces designed for teamwork, brainstorming, and project development. 
                  These areas feature smart boards, high-speed connectivity, and modular furniture to 
                  support different collaboration styles and foster innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Leading Research Initiatives</h2>
          <p className="text-gray-600 mb-8">Our department is actively engaged in groundbreaking research across multiple domains</p>
          
          <div className="space-y-6">
            {[
              {
                title: "AI-Driven Distributed Intrusion Detection Systems",
                faculties: "Dr. Sanjay Silakari & Prof. Shikha Agarwal",
                status: "Ongoing",
                cost: "₹2.85 Lakhs",
                agency: "Madhya Pradesh Council of Science & Technology, Bhopal",
                description: "Developing intelligent systems that can detect and respond to network intrusions using distributed architecture and machine learning algorithms."
              },
              {
                title: "Delay Tolerant Networks Application in Underdeveloped Regions",
                faculties: "Dr. Sanjay Silakari & Dr. Piyush K Shukla",
                status: "Submitted",
                cost: "₹18 Lakhs",
                agency: "AICTE",
                description: "Creating networking solutions for regions with limited connectivity, enabling digital inclusion and access to information in remote areas."
              },
              {
                title: "Swarm Intelligence in Bioinformatics",
                faculties: "Dr. Sanjay Silakari & Prof. Shikha Agarwal",
                status: "Submitted",
                cost: "₹17 Lakhs",
                agency: "AICTE",
                description: "Applying collective behavior algorithms to solve complex problems in genetic analysis, protein folding, and drug discovery."
              },
              {
                title: "Quantum-Inspired Optimization for Machine Learning",
                faculties: "Dr. Rajesh Kumar & Dr. Anita Singh",
                status: "Ongoing",
                cost: "₹24 Lakhs",
                agency: "Department of Science & Technology",
                description: "Exploring quantum computing principles to enhance machine learning algorithms for complex pattern recognition and optimization problems."
              },
            ].map((research, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{research.title}</h3>
                <p className="text-gray-600 mb-4">{research.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p><span className="font-semibold">Research Leads:</span> {research.faculties}</p>
                    <p><span className="font-semibold">Status:</span> <span className={research.status === "Ongoing" ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>{research.status}</span></p>
                  </div>
                  <div>
                    <p><span className="font-semibold">Funding:</span> {research.cost}</p>
                    <p><span className="font-semibold">Agency:</span> {research.agency}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Industry Partnerships */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Industry Partnerships</h2>
          <p className="text-gray-600 mb-8">Collaborations that enhance learning experiences and career opportunities</p>
          
          <div className="bg-gray-50 rounded-xl p-8 shadow-inner">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[TCS_logo, Cognizant_logo, IBM_logo, Deloitte_logo, Bajaj_logo, Tejas_logo, jaro_education, persistent_logo
              ].map((logo, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-24">
                  <img src={logo} alt="Partner Company" className="max-h-12 max-w-full" />
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-700">
                Our department has established strong partnerships with leading technology companies, 
                providing students with internship opportunities, sponsored projects, expert lectures, 
                and pathways to exciting careers in the tech industry.
              </p>
            </div>
          </div>
        </section>
        
        {/* Student Outcomes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Student Achievements</h2>
          <p className="text-gray-600 mb-8">Our graduates excel in the tech industry and academia</p>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
                <p className="text-gray-700">Placement Rate</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">45+</div>
                <p className="text-gray-700">Research Publications Per Year</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">12</div>
                <p className="text-gray-700">Entrepreneurial Ventures</p>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-gray-700 text-center">
                Our graduates have secured positions at global tech giants, founded successful startups,
                and been accepted to prestigious graduate programs at institutions like MIT, Stanford, and CMU.
              </p>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="mb-16 text-center">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Shape the Future?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join our vibrant community of innovators and problem-solvers. The Department of Computer Science
              & Engineering offers an ideal environment to nurture your talents and prepare for an exciting career.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <NavLink to="/student" className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                Admission Information
              </NavLink>
             
                <NavLink to="/contact" className="bg-transparent hover:bg-blue-600 border border-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
                      Contact Us
                </NavLink>
                
          
            </div>
          </div>
        </section>
      </div>
   
    </>
  );
};

export default Department;
