import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaExternalLinkAlt } from 'react-icons/fa';
import acheive1 from '../../assets/Achieve1.AVIF';
import acheive2 from '../../assets/Achieve2.AVIF';
import acheive3 from '../../assets/Achieve3.AVIF';

const StudentAchievements = () => {
  const achievements = [
    {
      title: "Smart India Hackathon 2024 Winners",
      description: "A team of 6 students from our department won the first prize at SIH 2024 for their project on AI-assisted healthcare.",
      date: "March 2024",
      image: acheive1,
      link: "#"
    },
    {
      title: "ACM-ICPC Regional Finalists",
      description: "Our students represented the university at the Asia Regional Contest of the International Collegiate Programming Contest.",
      date: "December 2023",
      image: acheive2,
      link: "#"
    },
    {
      title: "Microsoft Imagine Cup National Round",
      description: "Project 'EcoTrack' by final year students qualified for the national round of Microsoft Imagine Cup 2023.",
      date: "February 2023",
      image: acheive3, 
      link: "#"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="achievements"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <span className="w-10 h-1 bg-amber-500 rounded-full"></span>
          Student Achievements
        </h2>
        <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1">
          View all achievements <FaExternalLinkAlt className="text-xs" />
        </a>
      </div>
      
      <div className="space-y-6 flex justify-evenly flex-wrap">
        {achievements.map((achievement, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white  rounded-xl shadow-md  overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-indigo-900/40 md:bg-gradient-to-b"></div>
                <img
                  className="h-56 w-full object-cover md:h-full"
                  src={achievement.image}
                  alt={achievement.title}
                />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center mb-2">
                  <FaTrophy className="text-amber-500 mr-2" />
                  <p className="text-sm font-medium text-amber-600">{achievement.date}</p>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <a 
                  href={achievement.link} 
                  className="inline-flex items-center px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors text-sm font-medium"
                >
                  Read more
                  <FaExternalLinkAlt className="ml-2 text-xs" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default StudentAchievements;