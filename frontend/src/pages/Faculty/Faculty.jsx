import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaArrowLeft, FaEnvelope, FaPhone, FaLinkedin, 
         FaGraduationCap, FaChalkboardTeacher, FaBook, FaAward, FaMedal } from "react-icons/fa";
import ProfessorProfile from "../../component/MoreDetails/ProfessorProfile.jsx";
import axios from "axios";
import eventBanner from "../../assets/eventBanner.jpg";
// import { Regular, NonRegular } from '../../Data/FacultyDetails';

function Faculty() {
  const [faculty, setFaculty] = useState(true);
  const [Regular, setRegular] = useState([]);
  const [NonRegular, setNonRegular] = useState([]);
  const [facultyData, setFacultyData] = useState();
  const [activeTab, setActiveTab] = useState("regular");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArea, setFilterArea] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("name");
  const [visibleCount, setVisibleCount] = useState(6);
  const [filterExperience, setFilterExperience] = useState("");
  const [loading, setLoading] = useState({ faculty: true });


      // Faculty details API URL
  
      const api = import.meta.env.VITE_API_URL;



 
      const fetchFaculty = async () => {
        try {
          const response = await axios.get(`${api}/faculty`);
          
          
          const regularFaculty = response.data.filter(prof => prof.post === "regular");
    
          const nonRegularFaculty = response.data.filter(prof => prof.post === "non_regular");
          
          setRegular(regularFaculty);
          setNonRegular(nonRegularFaculty);
         
          
        } catch (error) {
          console.error("Error fetching faculty:", error);
        } finally {
          setLoading(prev => ({ ...prev, faculty: false }));
        }
      };
    
     useEffect(() => {
        fetchFaculty();
      },[])


  
  
  // Extract unique research areas for filtering
  // const allResearchAreas = [...new Set(
  //   [...Regular, ...NonRegular]
  //     .flatMap(prof => prof.research_areas)
  //     .filter(area => typeof area === 'string' && area.trim() !== '')
  // )];

  // Filter faculty based on search term, research area, and experience
  const getFilteredFaculty = (facultyArray) => {
    return facultyArray.filter(prof => 
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterArea === "" || (prof.research_areas && prof.research_areas.some(area => 
        typeof area === 'string' && area.toLowerCase().includes(filterArea.toLowerCase())))) &&
      (filterExperience === "" || 
        (filterExperience === "0-5" && parseInt(prof.experience) <= 5) ||
        (filterExperience === "6-10" && parseInt(prof.experience) > 5 && parseInt(prof.experience) <= 10) ||
        (filterExperience === "11+" && parseInt(prof.experience) > 10))
    );
  }

  // Sort faculty based on selected sort option
  const getSortedFaculty = (facultyArray) => {
    return [...facultyArray].sort((a, b) => {
      if (sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortOption === "experience") {
        return parseInt(b.experience) - parseInt(a.experience);
      } else if (sortOption === "publications") {
        return (b.publications?.length || 0) - (a.publications?.length || 0);
      }
      return 0;
    });
  }

  const filteredRegular = getSortedFaculty(getFilteredFaculty(Regular));
  const filteredNonRegular = getSortedFaculty(getFilteredFaculty(NonRegular));

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterArea("");
    setFilterExperience("");
    setSortOption("name");
  };



  return (
    <>
      {faculty ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-white"
        >
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
            <div className="absolute inset-0 opacity-20">
              <img 
                src={eventBanner}
                 alt="Faculty background" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="container mx-auto px-6 py-24 relative z-10">
              <h1 className="md:text-5xl text-3xl font-bold mb-6">Meet Our Faculty</h1>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="md:text-xl mx-auto max-w-3xl">
                Our distinguished faculty members are leaders in computer science and engineering research, 
                bringing expertise from both academia and industry to provide an exceptional educational experience.
              </p>
            </div>
          </div>

          {/* Faculty Stats */}
          <div className="bg-gray-50 py-8 border-b border-gray-200">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-blue-700">{Regular.length + NonRegular.length}</p>
                  <p className="text-gray-600">Total Faculty</p>
                </div>
                <div>
                <p className="text-3xl font-bold text-blue-700">{Regular.length}+</p>
                  <p className="text-gray-600">PhD Holders</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-700">{Regular.length*5}+</p>
                  <p className="text-gray-600">Research Publications</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-700">{Regular.length*2}+</p>
                  <p className="text-gray-600">Research Areas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-6 py-12">
            {/* Search and Filters */}
           

            {/* Faculty Tabs */}
            <div className="flex border-b mb-10">
              <button 
                className={`px-8 py-4 text-lg font-semibold transition ${activeTab === "regular" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("regular")}
              >
                Regular Faculty
              </button>
              <button 
                className={`px-8 py-4 text-lg font-semibold transition ${activeTab === "nonregular" 
                  ? "text-blue-600 border-b-2 border-blue-600" 
                  : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("nonregular")}
              >
                Non-Regular Faculty
              </button>
            </div>

            {/* Faculty Cards */}
            <AnimatePresence mode="wait">
              {activeTab === "regular" && (
                <motion.div
                  key="regular"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Regular Faculty</h2>
                  
                  {filteredRegular.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-xl">
                      <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
                      <p className="text-xl text-gray-500">No faculty found matching your filters</p>
                      <button 
                        onClick={resetFilters}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                        {filteredRegular.slice(0, visibleCount).map((faculty, index) => (
                          <EnhancedFacultyCard 
                            key={index}
                            faculty={faculty}
                            setFaculty={setFaculty}
                            setFacultyData={setFacultyData}
                          />
                        ))}
                      </div>
                      
                      {visibleCount < filteredRegular.length && (
                        <div className="text-center mt-10">
                          <button 
                            onClick={loadMore}
                            className="px-6 py-3 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition"
                          >
                            Load More Faculty
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
              
              {activeTab === "nonregular" && (
                <motion.div
                  key="nonregular"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Non-Regular Faculty</h2>
                  
                  {filteredNonRegular.length === 0 ? (
                    <div className="text-center py-16 bg-gray-50 rounded-xl">
                      <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
                      <p className="text-xl text-gray-500">No faculty found matching your filters</p>
                      <button 
                        onClick={resetFilters}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                        {filteredNonRegular.slice(0, visibleCount).map((faculty, index) => (
                          <EnhancedFacultyCard 
                            key={index}
                            faculty={faculty}
                            setFaculty={setFaculty}
                            setFacultyData={setFacultyData}
                          />
                        ))}
                      </div>
                      
                      {visibleCount < filteredNonRegular.length && (
                        <div className="text-center mt-10">
                          <button 
                            onClick={loadMore}
                            className="px-6 py-3 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition"
                          >
                            Load More Faculty
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto p-4">
            <button 
              className="flex items-center gap-2 mb-8 text-blue-600 hover:text-blue-800 transition"
              onClick={() => setFaculty(true)}
            >
              <FaArrowLeft /> Back to Faculty List
            </button>
          </div>
          <ProfessorProfile data={facultyData} setFaculty={setFaculty} />
        </motion.div>
      )}
     
    </>
  );
}

// Enhanced Faculty Card component
const EnhancedFacultyCard = ({ faculty, setFaculty, setFacultyData }) => {
  const handleProfileClick = () => {
    setFacultyData(faculty);
    setFaculty(false);
  };

  // Default image if faculty image is not available
  const defaultImage = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100"
    >
      {/* Faculty Image with Gradient Overlay */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={faculty.img || defaultImage}
          alt={faculty.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="font-bold text-xl">{faculty.name}</h3>
          <p className="font-medium">{faculty.designation}</p>
        </div>
      </div>
      
      <div className="p-5">
        {/* Experience and Education */}
        <div className="mb-3 space-y-2">
          {faculty.experience && (
            <div className="flex items-center">
              <FaChalkboardTeacher className="text-blue-600 mr-2" />
              <span className="text-sm text-gray-700">{faculty.experience} Experience</span>
            </div>
          )}
          
          
        </div>
        
        {/* Research Areas */}
        {/* {faculty.research_areas && faculty.research_areas.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Research Areas</h4>
            <div className="flex flex-wrap gap-1">
              {faculty.research_areas.slice(0, 3).map((area, index) => (
                typeof area === 'string' && area.trim() !== '' && (
                  <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-800 rounded-full">
                    {area}
                  </span>
                )
              ))}
              {faculty.research_areas.length > 3 && (
                <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
                  +{faculty.research_areas.length - 3}
                </span>
              )}
            </div>
          </div>
        )} */}
        
        {/* Publications & Achievements */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
          {faculty.publications && faculty.publications.length > 0 ? (
            <div className="flex items-center">
              <FaBook className="text-blue-600 mr-2" />
              <span className="text-sm text-gray-700">{faculty.publications.length} Publications</span>
            </div>
          ) : (
            <div></div>
          )}
          
          {faculty.achievements && faculty.achievements.length > 0 && (
            <div className="flex items-center">
              <FaAward className="text-blue-600 mr-2" />
              <span className="text-sm text-gray-700">{faculty.achievements.length} Awards</span>
            </div>
          )}
        </div>
        
        {/* Contact Info & View Profile Button */}
        <div className="border-t border-gray-100 pt-4">
          {faculty.contact && (
            <div className="mb-3 space-y-1">
              {faculty.contact.email && (
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-2 text-xs" />
                  <a href={`mailto:${faculty.contact.email}`} className="text-xs text-gray-600 hover:text-blue-600 truncate">
                    {faculty.contact.email}
                  </a>
                </div>
              )}
              {faculty.contact.phone && (
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-2 text-xs" />
                  <a href={`tel:${faculty.contact.phone}`} className="text-xs text-gray-600 hover:text-blue-600">
                    {faculty.contact.phone}
                  </a>
                </div>
              )}
            </div>
          )}
          
          <button
            onClick={handleProfileClick}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300 flex justify-center items-center gap-2"
          >
            View Full Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Faculty;