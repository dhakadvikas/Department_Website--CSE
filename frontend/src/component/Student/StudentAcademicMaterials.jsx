import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaCalendarAlt, FaBook, FaFileAlt, FaDownload, FaSpinner, FaSearch } from 'react-icons/fa';
// import { toast } from 'react-hot-toast'; // Consider adding this package

const StudentAcademicMaterials = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const [academics, setAcademics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch academic materials - using useCallback to prevent unnecessary re-renders
  const fetchAcademics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/academics`);
      
      setAcademics(response.data.map(academic => ({
        id: academic._id,
        _id: academic._id,
        title: academic.title || 'Untitled Document',
        status: academic.status || 'general',
        date: academic.date || new Date().toISOString(),
        file: academic.file ? `${apiUrl}/${academic.file}` : null,
      })));
    } catch (error) {
      console.error("Error fetching academic materials:", error);
      // toast.error("Failed to load academic materials");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchAcademics();
  }, [fetchAcademics]);

  // Material status icon mapping - memoized to prevent re-renders
  const getIcon = useCallback((status) => {
    switch(status) {
      case 'syllabus': return <FaBook className="text-blue-600 text-xl" />;
      case 'calender': return <FaCalendarAlt className="text-green-600 text-xl" />;
      case 'general': 
      default: return <FaFileAlt className="text-purple-600 text-xl" />;
    }
  }, []);

  // Format date function - memoized
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Invalid date';
    }
  }, []);

  // Handle document view/download
  const handleDocumentAction = useCallback((e, academic) => {
    if (!academic.file) {
      e.preventDefault();
      // toast.error('File unavailable for download');
      return false;
    }
    return true;
  }, []);

  // Filter materials based on status and search query - memoized for performance
  const filteredAcademics = useMemo(() => {
    return academics.filter(item => {
      const matchesFilter = activeFilter === 'all' || item.status === activeFilter;
      const matchesSearch = item.title && 
        item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [academics, activeFilter, searchQuery]);

  // Filter options for reusability
  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'calender', label: 'Calendar' },
    { id: 'general', label: 'General' },
  ];

  return (
    <section className="py-10 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Academic Materials</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto px-4">
          Access all your academic resources, including syllabi, academic calendars, and other important documents.
        </p>
      </motion.div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-4 gap-4">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
          {filterOptions.map(option => (
            <button 
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === option.id
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Content Area with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        {/* Loading State */}
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col justify-center items-center h-64"
          >
            <FaSpinner className="animate-spin text-blue-600 text-4xl mb-4" />
            <p className="text-gray-500">Loading academic materials...</p>
          </motion.div>
        ) : (
          <>
            {/* Empty State */}
            {filteredAcademics.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 bg-gray-50 rounded-xl mx-4 shadow-sm"
              >
                <div className="h-20 w-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaFileAlt className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No materials found</h3>
                <p className="text-gray-500">
                  {searchQuery ? 'Try a different search term' : 'Check back later for updates'}
                </p>
              </motion.div>
            ) : (
              /* Grid of Materials */
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
              >
                {filteredAcademics.map((academic) => (
                  <motion.div
                    key={academic._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:border-blue-200 transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-50 p-3 rounded-lg mr-4">
                          {getIcon(academic.status)}
                        </div>
                        <div>
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 py-1 px-2 rounded-full uppercase">
                            {academic.status}
                          </span>
                          <h3 className="font-bold text-lg text-gray-800 mt-1 line-clamp-1">
                            {academic.title}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-4">
                        Updated on {formatDate(academic.date)}
                      </div>
                      
                      {academic.file ? (
                        <a 
                          href={academic.file}
                          download={academic.title.replace(/\s+/g, '_')}
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => handleDocumentAction(e, academic)}
                          className="flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all w-full font-medium"
                          aria-label={`Download ${academic.title}`}
                        >
                          <FaDownload className="mr-2" /> Download Document
                        </a>
                      ) : (
                        <button
                          disabled
                          className="flex items-center justify-center py-3 px-4 bg-gray-100 text-gray-400 rounded-lg w-full font-medium cursor-not-allowed"
                        >
                          <FaFileAlt className="mr-2" /> File Unavailable
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StudentAcademicMaterials;

// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { FiDownload } from 'react-icons/fi';
// import { FaCalendarAlt, FaBook, FaFileAlt, FaDownload, FaSpinner } from 'react-icons/fa';

// const StudentAcademicMaterials = () => {
//   const apiUrl = import.meta.env.VITE_API_URL;
  
//   const [academics, setAcademics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [downloadError, setDownloadError] = useState(null);

//  // Fix option 1: Update your fetch function to properly set the academics state
// useEffect(() => {
//   const fetchAcademics = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/academics`);
//       console.log("first", response.data);
      
//       // Direct assignment of the mapped array to academics state
//       setAcademics(response.data.map(academic => ({
//         id: academic._id,
//         _id: academic._id, // Keep both id and _id for compatibility
//         title: academic.title,
//         status: academic.status,
//         date: academic.date,
//         file: academic.file ? `${apiUrl}/${academic.file}` : null,
//         // file: academic.file, // Assuming file is already a URL or path
//       })));
      
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching academic materials:", error);
//       setLoading(false);
//     }
//   };

//   fetchAcademics();
// }, [apiUrl]);

//   // Get icon based on material status
//   const getIcon = (status) => {
//     switch(status) {
//       case 'syllabus': return <FaBook className="text-blue-600 text-xl" />;
//       case 'calender': return <FaCalendarAlt className="text-green-600 text-xl" />;
//       case 'general': 
//       default: return <FaFileAlt className="text-purple-600 text-xl" />;
//     }
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   // Handle file download
//   const handleDownload = (e, item) => {
//     // If file URL is not valid, prevent default behavior
//     if (!item.file || typeof item.file !== 'string' || item.file.trim() === '') {
//       e.preventDefault();
//       setDownloadError('File unavailable for download');
//       setTimeout(() => setDownloadError(null), 3000); // Clear error after 3 seconds
//       return false;
//     }
//     // Otherwise let the download proceed
//     return true;
//   };

//   // Filter materials based on status and search query
//   const filteredAcademics = academics.filter(item => {
//     const matchesFilter = activeFilter === 'all' || item.status === activeFilter;
//     const matchesSearch = item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   return (
//     <section className="py-10">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="mb-8 text-center"
//       >
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">Academic Materials</h2>
//         <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Access all your academic resources, including syllabi, academic calendars, and other important documents.
//         </p>
//       </motion.div>

//       {downloadError && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-4">
//           <span className="block sm:inline">{downloadError}</span>
//         </div>
//       )}

//       {/* Search and Filter Controls */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 px-4">
//         <div className="flex flex-wrap space-x-2 mb-4 md:mb-0">
//           <button 
//             onClick={() => setActiveFilter('all')}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all mb-2 ${
//               activeFilter === 'all' 
//                 ? 'bg-blue-600 text-white shadow-md' 
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             All
//           </button>
//           <button 
//             onClick={() => setActiveFilter('syllabus')}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all mb-2 ${
//               activeFilter === 'syllabus' 
//                 ? 'bg-blue-600 text-white shadow-md' 
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Syllabus
//           </button>
//           <button 
//             onClick={() => setActiveFilter('calender')}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all mb-2 ${
//               activeFilter === 'calender' 
//                 ? 'bg-blue-600 text-white shadow-md' 
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Calendar
//           </button>
//           <button 
//             onClick={() => setActiveFilter('general')}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all mb-2 ${
//               activeFilter === 'general' 
//                 ? 'bg-blue-600 text-white shadow-md' 
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             General
//           </button>
//         </div>
        
//         <div className="relative w-full md:w-64">
//           <input
//             type="text"
//             placeholder="Search materials..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
//           />
//           <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Loading State */}
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <FaSpinner className="animate-spin text-blue-600 text-4xl" />
//         </div>
//       ) : (
//         <>
//           {/* Empty State */}
//           {filteredAcademics.length === 0 ? (
//             <div className="text-center py-16 bg-gray-50 rounded-xl mx-4">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <h3 className="text-lg font-medium text-gray-700 mb-2">No materials found</h3>
//               <p className="text-gray-500">
//                 {searchQuery ? 'Try a different search term' : 'Check back later for updates'}
//               </p>
//             </div>
//           ) : (
//             /* Grid of Materials */
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
//               {filteredAcademics.map((academic) => (
//                 <motion.div
//                   key={academic._id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.3 }}
//                   whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//                   className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 group hover:border-blue-200 transition-all"
//                 >
//                   <div className="p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center">
//                         <div className="bg-blue-50 p-3 rounded-lg mr-4">
//                           {getIcon(academic.status)}
//                         </div>
//                         <div>
//                           <span className="text-xs font-medium text-blue-600 bg-blue-50 py-1 px-2 rounded-full uppercase">
//                             {academic.status}
//                           </span>
//                           <h3 className="font-bold text-lg text-gray-800 mt-1 line-clamp-1">
//                             {academic.title}
//                           </h3>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="text-sm text-gray-500 mb-4">
//                       Updated on {formatDate(academic.date)}
//                     </div>
                    
                   
//                     {academic.file ? (
//                        <a 
//                                 href={academic.file}
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
//                                 aria-label={`View document for ${academic.title}`}
//                               >
//                                 <FaDownload className="mr-2" />
//                                 View Document
//                               </a>
//                     ) : (
//                       <button
//                         disabled
//                         className="flex items-center justify-center py-3 px-4 bg-gray-100 text-gray-400 rounded-lg w-full font-medium cursor-not-allowed"
//                       >
//                         <FaDownload className="mr-2" /> File Unavailable
//                       </button>
//                     )}

//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </section>
//   );
// };

// export default StudentAcademicMaterials;