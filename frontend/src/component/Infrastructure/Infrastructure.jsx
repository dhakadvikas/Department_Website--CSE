
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "framer-motion";
import Data from "../../Data/CardData.jsx";
import Card from "../Card/Card.jsx";
import Infra from "../../assets/Infra1.jpeg";
import { FaServer, FaLaptopCode, FaRobot, FaVrCardboard, FaNetworkWired, FaDatabase } from "react-icons/fa";

function Infrastructure() {
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
  };

  const techFacilities = [
    { icon: <FaServer className="text-4xl text-blue-500" />, title: "High-Performance Computing Lab", desc: "Equipped with powerful workstations for computation-intensive tasks" },
    { icon: <FaLaptopCode className="text-4xl text-blue-500" />, title: "Software Development Lab", desc: "Modern development environment with latest tools and frameworks" },
    { icon: <FaRobot className="text-4xl text-blue-500" />, title: "AI & Robotics Lab", desc: "Specialized facility for artificial intelligence and robotics research" },
    { icon: <FaVrCardboard className="text-4xl text-blue-500" />, title: "VR/AR Studio", desc: "Immersive environment for virtual and augmented reality development" },
    { icon: <FaNetworkWired className="text-4xl text-blue-500" />, title: "Networking Lab", desc: "Advanced networking equipment for practical training and research" },
    { icon: <FaDatabase className="text-4xl text-blue-500" />, title: "Data Science Center", desc: "Resources for big data analytics and machine learning projects" }
  ];

  return (
    <section id="infrastructure" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Computing Infrastructure</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600">
            State-of-the-art facilities supporting education, research, and innovation
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-xl overflow-hidden h-[400px] mb-16"
        >
          <img src={Infra} alt="CS Department Infrastructure" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
            <div className="ml-10 max-w-xl text-white p-6 bg-blue-900/30 backdrop-blur-sm rounded-lg">
              <h3 className="text-3xl font-bold mb-3">Cutting-Edge Technology</h3>
              <p className="text-lg">
                Our department is equipped with the latest technology and resources to provide students with hands-on experience in various domains of computer science and engineering.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Tech Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {techFacilities.map((facility, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="flex justify-center mb-4">{facility.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2">{facility.title}</h3>
              <p className="text-slate-600 text-center">{facility.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Infrastructure Cards */}
        <h3 className="text-2xl font-semibold text-center mb-8">Additional Facilities</h3>
        <div className="py-4 ">
          <Carousel
            responsive={responsive}
            autoPlay
            infinite
            autoPlaySpeed={2500}
            containerClass="pb-10"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
          >
            {Data.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.03 }} 
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card heading={item.heading} content={item.content} icon={item.icon} />
              </motion.div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default Infrastructure;
