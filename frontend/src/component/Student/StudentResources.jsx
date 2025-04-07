import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBook, 
  FaDesktop, 
  FaClipboardList, 
  FaCalendarAlt, 
  FaDownload, 
  FaChevronRight 
} from 'react-icons/fa';

const StudentResources = () => {
  const resources = [
    {
      icon: <FaBook />,
      title: "Academic Calendar",
      description: "Important dates for the academic year",
      link: "#"
    },
    {
      icon: <FaDesktop />,
      title: "Lab Manuals",
      description: "Practical guides for all laboratory courses",
      link: "#"
    },
    {
      icon: <FaClipboardList />,
      title: "Syllabus",
      description: "Current CSE curriculum and courses",
      link: "#"
    },
    {
      icon: <FaCalendarAlt />,
      title: "Exam Schedule",
      description: "Upcoming examination dates",
      link: "/student/exam-schedule"
    }
  ];

  const downloads = [
    { title: "Anti-Ragging Undertaking Form", size: "215 KB" },
    { title: "Student Leave Application Form", size: "189 KB" },
    { title: "Laboratory Project Proposal Format", size: "320 KB" },
    { title: "Internship Request Letter Template", size: "205 KB" }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      id="resources"
      className="bg-white rounded-xl shadow-md p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-6 h-1 bg-amber-500 rounded-full"></span>
        Student Resources
      </h2>
      
      <div className="space-y-4 mb-6">
        {resources.map((resource, index) => (
          <a 
            key={index}
            href={resource.link}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-indigo-50 transition-colors group"
          >
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {resource.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors">{resource.title}</h3>
              <p className="text-sm text-gray-500">{resource.description}</p>
            </div>
            <FaChevronRight className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
          </a>
        ))}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-800 mt-8 mb-4">Important Documents</h3>
      <div className="space-y-3">
        {downloads.map((download, index) => (
          <a 
            key={index}
            href="#"
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-md group-hover:bg-white transition-colors">
                <FaDownload className="text-gray-500 group-hover:text-indigo-600 transition-colors" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{download.title}</p>
                <p className="text-xs text-gray-500">{download.size}</p>
              </div>
            </div>
            <span className="text-xs py-1 px-2 bg-gray-100 text-gray-600 rounded group-hover:bg-indigo-200 group-hover:text-indigo-700 transition-colors">
              PDF
            </span>
          </a>
        ))}
      </div>
    </motion.section>
  );
};

export default StudentResources;