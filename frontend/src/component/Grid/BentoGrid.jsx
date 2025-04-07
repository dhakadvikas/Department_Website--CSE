

import React, { useState, useEffect, useRef, useCallback, memo, use } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiX, FiCalendar, FiClock, FiFileText, FiImage, FiExternalLink } from 'react-icons/fi';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';


// Memoized card components to prevent unnecessary re-renders
const NoticeCard = memo(({ loading, error, notices, onOpenModal }) => (
  <motion.div 
    className="col-span-1 row-span-1 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.02 }}
    onClick={onOpenModal}
  >
    <div className="flex items-center mb-4">
      <FiFileText className="text-2xl text-blue-600 mr-2" />
      <h2 className="text-2xl font-bold text-gray-800">Notice Board</h2>
    </div>
    
    {loading ? (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    ) : error ? (
      <div className="text-center text-red-500 py-4">{error}</div>
    ) : (
      <ul className="space-y-3">
        {notices.slice(0, 5).map((notice) => (
          <li key={notice.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:bg-blue-50 cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">{notice.title}</p>
              <p className="text-sm text-gray-500">{notice.date}</p>
            </div>
            <FiExternalLink className="text-blue-500" />
          </li>
        ))}
      </ul>
    )}
    <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
    <div className="flex items-center justify-center gap-2">
      <FiFileText className="text-white" />
      View All Notices
    </div>
      
    </button>
  </motion.div>
));

const GalleryCard = memo(({ loading, error, gallery, galleryRef }) => (
  <motion.div 
    className="col-span-1 row-span-2 bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center mb-4">
      <FiImage className="text-2xl text-purple-600 mr-2" />
      <h2 className="text-2xl font-bold text-gray-800">Gallery</h2>
    </div>
    
    {loading ? (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
      </div>
    ) : error ? (
      <div className="text-center text-red-500 py-4">{error}</div>
    ) : gallery.length === 0 ? (
      <div className="text-center text-gray-500 py-12">No gallery items available</div>
    ) : (
      <div ref={galleryRef} className="h-[50em] overflow-y-hidden relative">
        <div className="space-y-4">
          {gallery.map((item, index) => (
            <div key={`${item.id}-${index}`} className="relative group">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover rounded-lg shadow-md"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400?text=Image+Not+Available';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-end p-4">
                <h3 className="text-white font-bold">{item.title}</h3>
                <p className="text-white text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </motion.div>
));

const EventsCard = memo(({ loading, error, events }) => (
  <motion.div 
    className="col-span-1 bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center mb-4">
      <FiClock className="text-2xl text-amber-600 mr-2" />
      <h2 className="text-2xl font-bold text-gray-800">Upcoming Events</h2>
    </div>
    
    {loading ? (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
      </div>
    ) : error ? (
      <div className="text-center text-red-500 py-4">{error}</div>
    ) : events.length === 0 ? (
      <div className="text-center text-gray-500 py-12">No upcoming events</div>
    ) : (
      <ul className="space-y-3">
        {events.slice(0,5).map((event) => (
          <li key={event.id} className="p-3 bg-white rounded-lg shadow-sm hover:bg-amber-50">
            <p className="font-medium text-gray-800">{event.title}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{event.date}</span>
              <span className="mx-2">•</span>
              <span>{event.time}</span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </motion.div>
));

const CalendarCard = memo(({ loading, error, dates }) => (
  <motion.div 
    className="col-span-1 bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.02 }}
    
  >
    <div className="flex items-center mb-4">
      <FiCalendar className="text-2xl text-green-600 mr-2" />
      <h2 className="text-2xl font-bold text-gray-800">Academic Calendar</h2>
    </div>
    
    {loading ? (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-500"></div>
      </div>
    ) : error ? (
      <div className="text-center text-red-500 py-4">{error}</div>
    ) : (
      <ul className="space-y-3">
        {dates.slice(0, 5).map((date) => (
          <li key={date.id} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:bg-green-50 cursor-pointer">
            <div>
              <p className="font-medium text-gray-800">{date.title}</p>
              <p className="text-sm text-gray-500">{date.date}</p>
            </div>
            <FiExternalLink className="text-blue-500" />
          </li>
        ))}
      </ul>
    )}
    <button className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
      <Link to="/student#cal" className="flex items-center justify-center gap-2">
         <FiCalendar className="text-white" />
      View All Calender
      </Link>
       
    </button>
  </motion.div>
));

const StatsCard = memo(() => (
  <motion.div 
    className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Department Highlights</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <p className="text-3xl font-bold text-indigo-600">25+</p>
        <p className="text-gray-600">Faculty Members</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <p className="text-3xl font-bold text-indigo-600">500+</p>
        <p className="text-gray-600">Students</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <p className="text-3xl font-bold text-indigo-600">15+</p>
        <p className="text-gray-600">Research Labs</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <p className="text-3xl font-bold text-indigo-600">98%</p>
        <p className="text-gray-600">Placement Rate</p>
      </div>
    </div>
  </motion.div>
));

const NoticeModal = memo(({ isOpen, onClose, notices, loading, error }) => {
  if (!isOpen) return null;
  
  // Add ESC key listener for accessibility
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 shadow-xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Notices</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <FiX className="text-xl" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : (
            <ul className="space-y-4">
              {notices.map((notice) => (
                <li key={notice.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <a href={notice.file} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                        {notice.title}
                      </a>
                      <p className="text-sm text-gray-500">{notice.date}</p>
                    </div>
                    {notice.file && (
                      <a 
                        href={notice.file} 
                        download 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="Download"
                      >
                        <FiDownload />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
});

// Main component with optimized data fetching
const BentoGrid = () => {
    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const galleryRef = useRef(null);
    const scrollIntervalRef = useRef(null);
   

    
    // Consolidated data state
    const [data, setData] = useState({
        notices: [],
        gallery: [],
        upcomingEvents: [],
        importantDates: []
    });
    
    // Consolidated loading state
    const [loading, setLoading] = useState({
        notices: true,
        gallery: true,
        events: true,
        dates: true
    });
    
    // Consolidated error state
    const [error, setError] = useState({
        notices: null,
        gallery: null,
        events: null,
        dates: null
    });

    const apiUrl = import.meta.env.VITE_API_URL || '';

    // Open modal handler with useCallback to prevent unnecessary re-creation
    const handleOpenNoticeModal = useCallback(() => {
        setIsNoticeModalOpen(true);
    }, []);

    // Close modal handler with useCallback
    const handleCloseNoticeModal = useCallback(() => {
        setIsNoticeModalOpen(false);
    }, []);


    



    // Consolidated data fetching hook
    useEffect(() => {
        // Create abort controller for cleanup
        const controller = new AbortController();
        const { signal } = controller;
        
        const fetchAllData = async () => {
            // Fetch notices
            try {
                const noticeResponse = await axios.get(`${apiUrl}/notice`, { signal });
                setData(prev => ({
                    ...prev,
                    notices: noticeResponse.data.map(notice => ({
                        id: notice._id,
                        title: notice.title,
                        date: new Date(notice.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        file: notice.file ? `${apiUrl}/${notice.file}` : null,
                        details: notice.details
                    }))
                }));
                setLoading(prev => ({ ...prev, notices: false }));
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error('Error fetching notices:', err);
                    setError(prev => ({ ...prev, notices: 'Failed to load notices' }));
                    setLoading(prev => ({ ...prev, notices: false }));
                }
            }
            
            // Fetch gallery
            try {
                const galleryResponse = await axios.get(`${apiUrl}/events`, { signal });
                const imageEvents = galleryResponse.data
                    .filter(event => {
                        const fileName = event.file ? event.file.split('\\').pop() : null;
                        return fileName && fileName.match(/\.(jpeg|jpg|gif|png)$/i);
                    })
                    .map(event => ({
                        id: event._id,
                        image: `${apiUrl}/${event.file}`,
                        title: event.title,
                        description: event.details || 'Event details',
                        date: new Date(event.date).toLocaleDateString()
                    }));
                
                setData(prev => ({ ...prev, gallery: imageEvents }));
                setLoading(prev => ({ ...prev, gallery: false }));
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error('Error fetching gallery:', err);
                    setError(prev => ({ ...prev, gallery: 'Failed to load gallery' }));
                    setLoading(prev => ({ ...prev, gallery: false }));
                }
            }
            
            // Fetch upcoming events
            try {
                const eventsResponse = await axios.get(`${apiUrl}/events`, { signal });
                const upcoming = eventsResponse.data
                    .filter(event => event.status === 'upcoming')
                    .map(event => {
                        const eventDate = new Date(event.date);
                        return {
                            id: event._id,
                            title: event.title,
                            date: eventDate.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }),
                            time: eventDate.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                            }),
                            details: event.details
                        };
                    });
                
                setData(prev => ({ ...prev, upcomingEvents: upcoming }));
                setLoading(prev => ({ ...prev, events: false }));
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error('Error fetching upcoming events:', err);
                    setError(prev => ({ ...prev, events: 'Failed to load upcoming events' }));
                    setLoading(prev => ({ ...prev, events: false }));
                }
            }
            
            // Fetch important dates
            try {
                const datesResponse = await axios.get(`${apiUrl}/academics`, { signal });
                const dates = datesResponse.data
                    .slice(0, 4)
                    .map(event => ({
                        id: event._id,
                        title: event.title,
                        file: event.file ? `${apiUrl}/${event.file}` : null,
                        date: new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }));
                
                setData(prev => ({ ...prev, importantDates: dates }));
                setLoading(prev => ({ ...prev, dates: false }));
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error('Error fetching important dates:', err);
                    setError(prev => ({ ...prev, dates: 'Failed to load important dates' }));
                    setLoading(prev => ({ ...prev, dates: false }));
                }
            }
        };

        fetchAllData();
        
        // Cleanup function
        return () => {
            controller.abort();
        };
    }, [apiUrl]);

    // Optimized infinite scroll with useEffect cleanup
    useEffect(() => {
        if (galleryRef.current && data.gallery.length > 0) {
            // Only set up the scroll interval if we have gallery items
            const setupScrollAnimation = () => {
                // Clear any existing interval
                if (scrollIntervalRef.current) {
                    clearInterval(scrollIntervalRef.current);
                }
                
                scrollIntervalRef.current = setInterval(() => {
                    if (galleryRef.current) {
                        if (galleryRef.current.scrollTop + galleryRef.current.clientHeight >= galleryRef.current.scrollHeight) {
                            // Reset scroll position when reached the bottom
                            galleryRef.current.scrollTop = 0;
                        } else {
                            galleryRef.current.scrollTop += 1;
                        }
                    }
                }, 50);
            };
            
            setupScrollAnimation();
            
            // Clean up interval
            return () => {
                if (scrollIntervalRef.current) {
                    clearInterval(scrollIntervalRef.current);
                }
            };
        }
    }, [data.gallery]);

    // Create gallery data with doubled items for smoother infinite scroll
    const galleryItems = data.gallery.length > 0 
        ? [...data.gallery, ...data.gallery] 
        : [];

    return (
        <div className="container mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold text-center mb-10 text-indigo-900">Department of Computer Science</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Extract components for each card */}
                <NoticeCard 
                    loading={loading.notices} 
                    error={error.notices}
                    notices={data.notices}
                    onOpenModal={handleOpenNoticeModal}
                />

                <GalleryCard 
                    loading={loading.gallery}
                    error={error.gallery}
                    gallery={galleryItems}
                    galleryRef={galleryRef}
                />

                <EventsCard 
                    loading={loading.events}
                    error={error.events}
                    events={data.upcomingEvents}
                />

                <CalendarCard 
                    loading={loading.dates}
                    error={error.dates}
                    dates={data.importantDates}
                />
                
                <StatsCard />
            </div>

            {/* Notice Modal */}
            <NoticeModal 
                isOpen={isNoticeModalOpen}
                onClose={handleCloseNoticeModal}
                notices={data.notices}
                loading={loading.notices}
                error={error.notices}
            />
        </div>
    );
};

export default memo(BentoGrid);