import React, { useEffect ,lazy , Suspense} from "react";
import Infrastructure from "../../component/Infrastructure/Infrastructure.jsx";
import { motion } from "framer-motion";
import CSEGallery from "../../component/Slider/Slider.jsx";
import { BsArrowRightCircle } from "react-icons/bs";
import Welcome from "../../component/Welcome/Welcome";
const Grid = lazy(() => import("../../component/Grid/BentoGrid"));
import axios from "axios";
import { useState, useCallback } from "react";
const NoticeModal = lazy(() => import("../../component/Notice/NoticeModal"));


function Home() {
  const [isAutoNoticeModalOpen, setIsAutoNoticeModalOpen] = useState(false);
  const [latestNotices, setLatestNotices] = useState([]);
  const [loading, setLoading] = useState({
    notices: true
  });
  const [error, setError] = useState({
    notices: null
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  
  // Handle modal close with useCallback to prevent unnecessary re-renders
  const handleCloseNoticeModal = useCallback(() => {
    setIsAutoNoticeModalOpen(false);
  }, []);

  // Optimized data fetching with caching
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchNotices = async () => {
      try {
        // Try to use cached data first
        const cachedData = sessionStorage.getItem('noticesData');
        const cacheTimestamp = sessionStorage.getItem('noticesTimestamp');
        
        // If cache is less than 5 minutes old, use it
        if (cachedData && cacheTimestamp) {
          const parsedData = JSON.parse(cachedData);
          const now = Date.now();
          const cacheAge = now - parseInt(cacheTimestamp);
          
          if (cacheAge < 300000) { // 5 minutes in milliseconds
            setLatestNotices(parsedData);
            setLoading({ notices: false });
            
            // Still show modal if notices exist
            if (parsedData.length > 0) {
              setTimeout(() => setIsAutoNoticeModalOpen(true), 2000);
            }
            return;
          }
        }
        
        // Fetch fresh data if no cache or cache expired
        const response = await axios.get(`${apiUrl}/notice`, { signal });
        console.log("response", response.data);
        const formattedNotices = response.data.map(notice => ({
          id: notice._id,
          title: notice.title,
          date: new Date(notice.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          file: notice.file ? `${notice.file}` : null,
          details: notice.details
        }));
        
        // Sort notices by date (newest first)
        formattedNotices.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Update state
        setLatestNotices(formattedNotices);
        setLoading({ notices: false });
        
        // Cache the data
        try {
          sessionStorage.setItem('noticesData', JSON.stringify(formattedNotices));
          sessionStorage.setItem('noticesTimestamp', Date.now().toString());
        } catch (err) {
          console.error('Error caching notices:', err);
        }
        
        // Show modal if notices exist (delayed to improve initial page load)
        if (formattedNotices.length > 0) {
          setTimeout(() => setIsAutoNoticeModalOpen(true), 2000);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Error fetching notices:', err);
          setError({ notices: 'Failed to load notices' });
          setLoading({ notices: false });
        }
      }
    };

    fetchNotices();
    
    return () => controller.abort();
  }, [apiUrl]);

    // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Welcome />

     


{/* 🔹 Programs Section */}
       <section className="py-20 bg-slate-800/80 text-white">
         <div className="container mx-auto px-4">
          <motion.div 
            {...fadeIn}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Academic Programs</h2>
            <div className="w-20 h-1 bg-blue-400 mx-auto mb-6"></div>
            <p className="text-lg text-slate-300">
              Our comprehensive academic programs prepare students for successful careers in the rapidly evolving field of computing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "B.Tech in Computer Science", desc: "A rigorous 4-year undergraduate program covering fundamentals and advanced topics in computer science." },
              { title: "M.Tech in Computer Science", desc: "An advanced program focusing on specialized areas like AI, ML, cybersecurity, and software engineering." },
              { title: "PhD Programs", desc: "Research-focused doctoral programs driving innovation in various computing domains." },
              
            ].map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-slate-700 to-slate-900 p-6 rounded-lg border border-slate-600 hover:border-blue-400 transition-all"
              >
                <h3 className="text-xl font-semibold mb-3 text-blue-300">{program.title}</h3>
                <p className="text-slate-300 mb-4">{program.desc}</p>
                <div className="flex justify-end">
                  <button className="flex items-center text-blue-400 hover:text-blue-300 transition-all">
                    Learn more <BsArrowRightCircle className="ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Gallery Section */}
      <CSEGallery/>

      
       {/* 🔹 Research Areas Section */}
      <section className="pt-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            {...fadeIn}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Research Excellence</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600">
              Our faculty and students are involved in cutting-edge research across various domains of computer science
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🤖", title: "Artificial Intelligence", desc: "Natural language processing, computer vision, and cognitive systems" },
              { icon: "🧠", title: "Machine Learning", desc: "Deep learning, reinforcement learning, and neural networks" },
              { icon: "🔒", title: "Cybersecurity", desc: "Network security, cryptography, and systems security" },
              { icon: "📊", title: "Data Science", desc: "Big data analytics, data mining, and visualization" },
              { icon: "🌐", title: "Cloud Computing", desc: "Distributed systems, virtualization, and edge computing" },
              { icon: "🕸️", title: "Web Technologies", desc: "Modern web frameworks, progressive web apps, and web security" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
     {/* Gallery Section */}
      {/* <Grid/> */}
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}> 
        <Grid />
      </Suspense> 

      {/* Infrastructure Section */}
      <Infrastructure />

     {/* Notice Modal - only render when needed */}   
            {isAutoNoticeModalOpen && (
            <Suspense fallback={null}> 
                <NoticeModal 
                  isOpen={isAutoNoticeModalOpen}
                  onClose={handleCloseNoticeModal}
                  notices={latestNotices}
                  loading={loading.notices}
                  error={error.notices}
                />
              </Suspense> 
            )}
    
    </div>
  );
}

export default Home;



