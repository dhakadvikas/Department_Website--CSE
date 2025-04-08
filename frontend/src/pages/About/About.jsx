import React, { useState, useEffect, Suspense } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import VisionMission from "../../component/VisionMission/VisionMission";
import PSOsPEOs from "../../component/PSOsPEOs/PSOsPEOs";
import { FaGraduationCap, FaLaptopCode, FaChalkboardTeacher, 
         FaFlask, FaUsers, FaGlobe, FaLinkedin, FaEnvelope,
        } from "react-icons/fa";
import MainCs from "../../assets/mainCs.jpeg";
import AboutBanner from"../../assets/AboutBanner.jpg"; 
import TestimonialCarousel from "../../component/Testimonial/TestimonialCarousel.jsx";
import AI from "../../assets/AI.jpg";
import Cyber from "../../assets/cyber.jpg";
import Iot from "../../assets/IOT.jpg";
import BigData from "../../assets/BigData.jpg";
import Cloud from "../../assets/cloud.jpg";
import Software from "../../assets/Software.jpg";
const AboutUs = () => {
const api = import.meta.env.VITE_API_URL || '';

  // State for API data
  const [testimonials, setTestimonials] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [loading, setLoading] = useState({
    testimonials: true,
    faculty: true
  });

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Fetch data from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${api}/feedback`);
        let data = Array.isArray(response.data) ? response.data : [];
        
        // If no testimonials are available, use fallback data
        if (data.length === 0) {
          data = [
            {
              _id: "1",
              name: "Rahul Sharma",
              feedback: "The computer science program provided me with both theoretical knowledge and practical skills that were essential for my career in software development. The faculty's mentorship was invaluable.",
              role: "Software Engineer, Google",
              year: "Class of 2019"
            },
            {
              _id: "2",
              name: "Priya Patel",
              feedback: "I'm particularly grateful for the research opportunities I received during my time in the department. The experience prepared me well for my doctoral studies abroad.",
              role: "PhD Candidate, MIT",
              year: "Class of 2020"
            },
            {
              _id: "3",
              name: "Amit Kumar",
              feedback: "The industry exposure through internships and projects gave me a competitive edge in the job market. I found myself well-prepared for the challenges of the tech industry.",
              role: "Tech Lead, Amazon",
              year: "Class of 2018"
            }
          ];
        }
        
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Set fallback data
        setTestimonials([
          {
            _id: "1",
            name: "Rahul Sharma",
            feedback: "The computer science program provided me with both theoretical knowledge and practical skills that were essential for my career in software development. The faculty's mentorship was invaluable.",
            role: "Software Engineer, Google",
            year: "Class of 2019"
          },
          {
            _id: "2",
            name: "Priya Patel",
            feedback: "I'm particularly grateful for the research opportunities I received during my time in the department. The experience prepared me well for my doctoral studies abroad.",
            role: "PhD Candidate, MIT",
            year: "Class of 2020"
          }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, testimonials: false }));
      }
    };

    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`${api}/faculty`);
        setFaculty(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching faculty:", error);
        // Set fallback data
        setFaculty([
          { 
            _id: "1", 
            name: "Dr. Rajesh Verma", 
            post: "Professor & Head", 
            qualification: "PhD in Computer Science",
            specialization: "Artificial Intelligence, Machine Learning",
            experience: "20+ years",
            email: "rajesh.verma@example.edu",
            img: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          { 
            _id: "2", 
            name: "Dr. Sunita Sharma", 
            post: "Associate Professor", 
            qualification: "PhD in Computer Networks",
            specialization: "Network Security, IoT",
            experience: "15+ years",
            email: "sunita.sharma@example.edu",
            img: "https://randomuser.me/api/portraits/women/44.jpg"
          },
          { 
            _id: "3", 
            name: "Dr. Vikram Singh", 
            post: "Assistant Professor", 
            qualification: "PhD in Data Science",
            specialization: "Big Data Analytics, Cloud Computing",
            experience: "10+ years",
            email: "vikram.singh@example.edu",
            img: "https://randomuser.me/api/portraits/men/62.jpg"
          },
          { 
            _id: "4", 
            name: "Dr. Meena Patel", 
            post: "Assistant Professor", 
            qualification: "PhD in Software Engineering",
            specialization: "Software Testing, DevOps",
            experience: "8+ years",
            email: "meena.patel@example.edu",
            img: "https://randomuser.me/api/portraits/women/66.jpg"
          }
        ]);
      } finally {
        setLoading(prev => ({ ...prev, faculty: false }));
      }
    };

    fetchTestimonials();
    fetchFaculty();

    // Auto rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonialIndex(current => 
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(current => 
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(current => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img 
            src={AboutBanner} 
            alt="Computer Science Department" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <h1 className="md:text-5xl text-3xl font-bold mb-6">Department of Computer Science & Engineering</h1>
            <p className="md:text-xl text-md opacity-90 leading-relaxed">
              Empowering future innovators through cutting-edge education, groundbreaking research, 
              and technological excellence since 1987
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          {/* About Us Section with Image */}
          <motion.section 
            className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:flex">
              <div className="md:w-1/2 p-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">About Our Department</h2>
                <div className="w-30 h-1 bg-blue-600 mb-8 mx-auto"></div>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Established in 1987, the Department of Computer Science and Engineering has evolved into 
                  a center of excellence for education, innovation, and research. For over three decades, 
                  we have been at the forefront of computing education in India.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our department offers comprehensive programs at undergraduate (BE CSE), postgraduate (ME CSE), 
                  and doctoral (PhD CSE) levels, preparing students to meet the evolving demands of the technology sector.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With state-of-the-art laboratories, experienced faculty, and strong industry connections, 
                  we provide an ideal environment for students to transform into skilled professionals, 
                  innovators, and leaders in the field of computer science.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src={MainCs} 
                  alt="Modern Computer Lab" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.section>

          {/* Vision & Mission Section with Enhanced Styling */}

          <VisionMission/>

          {/* PSOs & PEOs Section with Modern UI */}
        
          <PSOsPEOs/>

          {/* Department Highlights */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Department Highlights</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Cards for Department Highlights */}
              {[
                {
                  icon: <FaGraduationCap className="text-2xl text-blue-600" />,
                  title: "Academic Excellence",
                  description: "Our programs are designed to provide students with a strong theoretical foundation and practical skills, culminating in 98% placement rates and numerous awards.",
                  color: "blue"
                },
                {
                  icon: <FaLaptopCode className="text-2xl text-purple-600" />,
                  title: "Cutting-Edge Research",
                  description: "Our faculty and students engage in pioneering research across various domains including AI, machine learning, cybersecurity, IoT, and quantum computing.",
                  color: "purple"
                },
                {
                  icon: <FaChalkboardTeacher className="text-2xl text-green-600" />,
                  title: "Expert Faculty",
                  description: "Our department boasts 25+ distinguished faculty members with doctoral degrees from prestigious institutions and extensive industry experience.",
                  color: "green"
                },
                {
                  icon: <FaFlask className="text-2xl text-red-600" />,
                  title: "Modern Laboratories",
                  description: "Our 15+ specialized labs feature cutting-edge equipment and software, providing hands-on experience in diverse computing domains.",
                  color: "red"
                },
                {
                  icon: <FaUsers className="text-2xl text-amber-600" />,
                  title: "Industry Connections",
                  description: "We maintain strong partnerships with leading tech companies, ensuring our curriculum remains industry-relevant and providing internship opportunities.",
                  color: "amber"
                },
                {
                  icon: <FaGlobe className="text-2xl text-teal-600" />,
                  title: "Global Outlook",
                  description: "Our international collaborations and exchange programs provide students with a global perspective and exposure to diverse technological ecosystems.",
                  color: "teal"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className={`bg-white rounded-xl shadow-lg p-8 border-t-4 border-${item.color}-500`}
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`bg-${item.color}-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>


          
          {/* Timeline Section */}
          <motion.section 
            className="mb-16 bg-white rounded-2xl shadow-xl p-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Journey</h2>
            
            <div className="relative">
          
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 lg:bg-blue-200 md:bg-blue-200"></div>
              
             
              <div className="space-y-16">
              
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8  rounded-full border-4 lg:border-blue-500 lg:z-10 md:border-blue-500 md:z-10 border-blue-100 -z-10 bg-white"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                      <h3 className="text-xl font-bold text-blue-600">1987</h3>
                      <p className="text-gray-600">Foundation of the Department</p>
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <p className="text-gray-700">
                          The Department of Computer Science and Engineering was established with the aim of providing quality education and producing professionals of international standards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

             
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full border-4 lg:border-blue-500 lg:z-10 md:border-blue-500 md:z-10 border-blue-100 -z-10 bg-white"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <p className="text-gray-700">
                          Launched the postgraduate program (ME CSE) with an initial batch of 12 students, expanding educational offerings to cultivate research and advanced expertise.
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                      <h3 className="text-xl font-bold text-blue-600">1995</h3>
                      <p className="text-gray-600">Introduction of Postgraduate Program</p>
                    </div>
                  </div>
                </div>

              
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full border-4 lg:border-blue-500 lg:z-10 md:border-blue-500 md:z-10 border-blue-100 -z-10 bg-white"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                      <h3 className="text-xl font-bold text-blue-600">2005</h3>
                      <p className="text-gray-600">Research Center Establishment</p>
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <p className="text-gray-700">
                          Established a dedicated research center with state-of-the-art facilities, enabling faculty and students to pursue cutting-edge research in emerging technologies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full border-4 lg:border-blue-500 lg:z-10 md:border-blue-500 md:z-10 border-blue-100 -z-10 bg-white"></div>
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-8 mb-4 md:mb-0 md:text-right">
                      <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                        <p className="text-gray-700">
                          Today, our department continues to lead in computer science education with modern facilities, distinguished faculty, strong industry connections, and a commitment to innovation.
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                      <h3 className="text-xl font-bold text-blue-600">Present</h3>
                      <p className="text-gray-600">Center of Excellence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

         {/* Research Areas Section */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Research Areas</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Our department is involved in pioneering research across various domains of computer science, 
              addressing complex challenges and driving technological innovations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Artificial Intelligence & Machine Learning",
                  image:  AI, 
                  description: "Neural networks, deep learning, computer vision, natural language processing, and reinforcement learning."
                },
                {
                  title: "Cybersecurity & Network Defense",
                  image:  Cyber,
                  description: "Cryptography, secure systems, malware analysis, network security, and digital forensics."
                },
                {
                  title: "Internet of Things (IoT)",
                  image:  Iot,
                  description: "Embedded systems, sensor networks, smart environments, edge computing, and IoT security."
                },
                {
                  title: "Big Data Analytics",
                  image:  BigData,
                  description: "Data mining, distributed computing, statistical analysis, and data visualization techniques."
                },
                {
                  title: "Cloud Computing",
                  image:  Cloud,
                  description: "Distributed systems, virtualization, cloud security, service-oriented architectures, and edge computing."
                },
                {
                  title: "Software Engineering",
                  image:   Software,
                  description: "Agile methodologies, software testing, DevOps, software architecture, and formal verification."
                }
              ].map((area, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={area.image} 
                    alt={area.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{area.title}</h3>
                    <p className="text-gray-600">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Faculty Section with Tooltip Style */}

          <Suspense fallback={<div className="text-center h-screen bg-amber-600">Loading...</div>}>
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Distinguished Faculty</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet our team of expert educators and researchers who bring extensive academic knowledge and industry experience
              </p>
            </div>
            
            {loading.faculty ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {faculty.slice(0,4).map((member) => (
                  <motion.div 
                    key={member._id}
                    className="group relative"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Faculty Card */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-md transform transition-all duration-300 group-hover:shadow-xl">
                      <div className="h-64 relative overflow-hidden">
                        <img 
                          src={member.img || "https://via.placeholder.com/400x500?text=Faculty+Member"} 
                          alt={member.name}
                          className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="font-bold text-lg">{member.name}</h3>
                          <p className="text-sm text-gray-200">{member.post}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute left-0 right-0 -bottom-2 transform translate-y-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-20">
                      <div className="bg-white rounded-xl shadow-2xl p-5 m-2">
                        <div className="text-center mb-2">
                          <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
                          <p className="text-blue-600">{member.post}</p>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <p><span className="font-medium">Qualification:</span> {member.qualification}</p>
                          <p><span className="font-medium">Specialization:</span> {member.specialization}</p>
                          <p><span className="font-medium">Experience:</span> {member.experience}</p>
                        </div>
                        
                        <div className="mt-4 flex justify-center space-x-3">
                          <a href={`mailto:${member.email}`} className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200">
                            <FaEnvelope />
                          </a>
                          <a href="#" className="p-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200">
                            <FaLinkedin />
                          </a>
                        </div>
                      </div>
                      <div className="w-4 h-4 bg-white transform rotate-45 absolute -top-2 left-1/2 -translate-x-1/2"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="mt-10 text-center">
              <NavLink
                to="/faculty" 
                
                className="inline-block px-6 py-3 bg-indigo-50 text-indigo-700 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
              >
                View All Faculty Members
              </NavLink>
            </div>
          </motion.section>
          </Suspense>

          {/* Student Testimonials */}

          <TestimonialCarousel/>
              


          </div>
        </div>

        </>

          )

        }


export default AboutUs;