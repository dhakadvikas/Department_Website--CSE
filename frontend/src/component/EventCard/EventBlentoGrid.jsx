import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, Heart, Share2, BookmarkPlus } from 'lucide-react';

const BlentoEventsGrid = () => {
  // Sample events data with varied sizes for Blento-style layout
  const sampleEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      department: "Computer Science",
      type: "workshop",
      date: "March 20, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Tech Building, Room 305",
      imageUrl: "/api/placeholder/600/400",
      featured: true,
      attendees: 45,
      capacity: 60,
      description: "Join us for an interactive workshop on the latest developments in AI and machine learning technologies.",
      size: "large"
    },
    {
      id: 2,
      title: "Annual Cultural Festival",
      department: "Arts & Design",
      type: "cultural",
      date: "April 5-7, 2025",
      time: "All Day",
      location: "University Amphitheater",
      imageUrl: "/api/placeholder/400/600",
      featured: true,
      attendees: 230,
      capacity: 500,
      description: "Experience three days of music, dance, art exhibitions and cultural performances from around the world.",
      size: "tall"
    },
    {
      id: 3,
      title: "Engineering Design Competition",
      department: "Engineering",
      type: "competition",
      date: "March 25, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Engineering Complex",
      imageUrl: "/api/placeholder/400/300",
      featured: false,
      attendees: 78,
      capacity: 100,
      description: "Showcase your engineering skills in this annual competition with prizes for the most innovative designs.",
      size: "medium"
    },
    {
      id: 4,
      title: "Business Leadership Seminar",
      department: "Business School",
      type: "academic",
      date: "March 18, 2025",
      time: "3:00 PM - 6:00 PM",
      location: "Business Building, Auditorium B",
      imageUrl: "/api/placeholder/400/300",
      featured: false,
      attendees: 56,
      capacity: 120,
      description: "Industry leaders share their insights on effective leadership strategies in today's business environment.",
      size: "medium"
    },
    {
      id: 5,
      title: "Chemistry Lab Showcase",
      department: "Natural Sciences",
      type: "workshop",
      date: "March 22, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Science Center, Lab 201",
      imageUrl: "/api/placeholder/300/300",
      featured: false,
      attendees: 30,
      capacity: 40,
      description: "Explore fascinating chemical reactions and experiments in this hands-on laboratory showcase.",
      size: "small"
    },
    {
      id: 6,
      title: "International Food Festival",
      department: "Cultural Affairs",
      type: "cultural",
      date: "March 29, 2025",
      time: "11:00 AM - 7:00 PM",
      location: "University Quad",
      imageUrl: "/api/placeholder/600/300",
      featured: true,
      attendees: 350,
      capacity: 600,
      description: "Taste delicious cuisines from around the world prepared by student cultural organizations.",
      size: "wide"
    },
    {
      id: 7,
      title: "Photography Exhibition",
      department: "Arts & Design",
      type: "cultural",
      date: "March 26, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Arts Gallery",
      imageUrl: "/api/placeholder/300/400",
      featured: false,
      attendees: 120,
      capacity: 200,
      description: "Student photographers showcase their best work in this annual exhibition.",
      size: "small"
    },
    {
      id: 8,
      title: "Hackathon 2025",
      department: "Computer Science",
      type: "competition",
      date: "April 10-12, 2025",
      time: "48 Hours",
      location: "Innovation Hub",
      imageUrl: "/api/placeholder/500/500",
      featured: true,
      attendees: 180,
      capacity: 200,
      description: "Build innovative solutions in this 48-hour coding challenge with amazing prizes and recruitment opportunities.",
      size: "large"
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredEvent, setHoveredEvent] = useState(null);
  
  // Filter events based on active filter
  const filteredEvents = activeFilter === 'all' 
    ? sampleEvents 
    : sampleEvents.filter(event => event.type === activeFilter);
  
  // Dynamic badge color based on event type
  const getBadgeColor = (type) => {
    const colors = {
      workshop: "bg-blue-500",
      cultural: "bg-purple-500",
      academic: "bg-green-500",
      competition: "bg-orange-500",
      conference: "bg-red-500"
    };
    return colors[type] || "bg-gray-500";
  };

  // Event Card Component with different size classes
  const BlentoEventCard = ({ event }) => {
    // Define size classes for different card sizes
    const sizeClasses = {
      small: "col-span-1 row-span-1",
      medium: "col-span-1 row-span-1 sm:col-span-1 md:col-span-1",
      large: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2",
      wide: "col-span-1 row-span-1 sm:col-span-2",
      tall: "col-span-1 row-span-2"
    };

    return (
      <div 
        className={`${sizeClasses[event.size] || sizeClasses.medium} relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
        onMouseEnter={() => setHoveredEvent(event.id)}
        onMouseLeave={() => setHoveredEvent(null)}
      >
        {/* Event Image */}
        <div className="relative w-full h-full">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80"></div>
          
          {/* Event Type Badge */}
          <div className={`absolute top-3 left-3 ${getBadgeColor(event.type)} text-white px-3 py-1 text-xs font-medium rounded-full z-10`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </div>
          
          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 flex items-center rounded-full z-10">
              <Star size={12} className="mr-1" />
              <span className="text-xs font-medium">Featured</span>
            </div>
          )}
          
          {/* Hover overlay with details */}
          <div 
            className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-between p-4 transition-opacity duration-300 ${
              hoveredEvent === event.id ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div>
              <span className="text-xs text-indigo-300 font-medium">{event.department}</span>
              <h3 className="text-white font-bold text-lg mt-1">{event.title}</h3>
              <p className="text-gray-300 text-sm mt-2 line-clamp-3">{event.description}</p>
            </div>
            
            <div className="mt-auto">
              {/* Event Meta Info */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center text-gray-300">
                  <Calendar size={14} className="mr-2 text-indigo-300" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <Clock size={14} className="mr-2 text-indigo-300" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <MapPin size={14} className="mr-2 text-indigo-300" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                  <button className="text-white hover:text-pink-400 transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="text-white hover:text-blue-400 transition-colors">
                    <Share2 size={18} />
                  </button>
                  <button className="text-white hover:text-yellow-400 transition-colors">
                    <BookmarkPlus size={18} />
                  </button>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3 py-1 rounded-full transition-colors">
                  Register
                </button>
              </div>
            </div>
          </div>
          
          {/* Always visible bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <h3 className="text-white font-bold text-lg truncate">{event.title}</h3>
            <div className="flex items-center text-white text-xs mt-1">
              <Calendar size={12} className="mr-1" />
              <span>{event.date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Filter buttons
  const filterButtons = [
    { id: 'all', label: 'All Events' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'competition', label: 'Competitions' },
    { id: 'academic', label: 'Academic' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Upcoming Events & Activities</h2>
        <p className="text-gray-600 mt-2">Discover and participate in exciting events across campus</p>
      </div>
    
      {/* Filter buttons */}
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {filterButtons.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Blento Grid - uses CSS grid with different spans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-min">
        {filteredEvents.map(event => (
          <BlentoEventCard key={event.id} event={event} />
        ))}
      </div>
      
      {/* Empty state */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found for this category.</p>
        </div>
      )}
      
      {/* Load more button */}
      {filteredEvents.length > 0 && (
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md">
            Explore More Events
          </button>
        </div>
      )}
    </div>
  );
};

export default BlentoEventsGrid;