import React, { useState } from 'react';
import EventCard from './EventCard';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

const EventsGrid = () => {
  // Sample events data
  const sampleEvents = [
    {
      id: 1,
      title: "AI & Machine Learning Workshop",
      department: "Computer Science",
      type: "workshop",
      date: "March 20, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Tech Building, Room 305",
      imageUrl: "/api/placeholder/400/200",
      featured: true,
      attendees: 45,
      capacity: 60,
      description: "Join us for an interactive workshop on the latest developments in AI and machine learning technologies."
    },
    {
      id: 2,
      title: "Annual Cultural Festival",
      department: "Arts & Design",
      type: "cultural",
      date: "April 5-7, 2025",
      time: "All Day",
      location: "University Amphitheater",
      imageUrl: "/api/placeholder/400/200",
      featured: true,
      attendees: 230,
      capacity: 500,
      description: "Experience three days of music, dance, art exhibitions and cultural performances from around the world."
    },
    {
      id: 3,
      title: "Engineering Design Competition",
      department: "Engineering",
      type: "competition",
      date: "March 25, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Engineering Complex",
      imageUrl: "/api/placeholder/400/200",
      featured: false,
      attendees: 78,
      capacity: 100,
      description: "Showcase your engineering skills in this annual competition with prizes for the most innovative designs."
    },
    {
      id: 4,
      title: "Business Leadership Seminar",
      department: "Business School",
      type: "academic",
      date: "March 18, 2025",
      time: "3:00 PM - 6:00 PM",
      location: "Business Building, Auditorium B",
      imageUrl: "/api/placeholder/400/200",
      featured: false,
      attendees: 56,
      capacity: 120,
      description: "Industry leaders share their insights on effective leadership strategies in today's business environment."
    },
    {
      id: 5,
      title: "Chemistry Lab Showcase",
      department: "Natural Sciences",
      type: "workshop",
      date: "March 22, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Science Center, Lab 201",
      imageUrl: "/api/placeholder/400/200",
      featured: false,
      attendees: 30,
      capacity: 40,
      description: "Explore fascinating chemical reactions and experiments in this hands-on laboratory showcase."
    },
    {
      id: 6,
      title: "International Food Festival",
      department: "Cultural Affairs",
      type: "cultural",
      date: "March 29, 2025",
      time: "11:00 AM - 7:00 PM",
      location: "University Quad",
      imageUrl: "/api/placeholder/400/200",
      featured: true,
      attendees: 350,
      capacity: 600,
      description: "Taste delicious cuisines from around the world prepared by student cultural organizations."
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  
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

  // Event Card Component (inline)
  const EventCard = ({ event }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1">
        {/* Event Image */}
        <div className="relative">
          <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
          
          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 flex items-center rounded-bl-lg">
              <Star size={14} className="mr-1" />
              <span className="text-xs font-medium">Featured</span>
            </div>
          )}
          
          {/* Event Type Badge */}
          <div className={`absolute top-0 left-0 ${getBadgeColor(event.type)} text-white px-3 py-1 text-xs font-medium rounded-br-lg`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </div>
        </div>
        
        {/* Event Details */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{event.title}</h3>
            {/* Department Tag */}
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
              {event.department}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
          
          {/* Event Meta Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-gray-700">
              <Calendar size={14} className="mr-2" />
              <span>{event.date}</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <Clock size={14} className="mr-2" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <MapPin size={14} className="mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
          
          {/* Registration Status */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center text-sm text-gray-600">
                <Users size={14} className="mr-1" />
                <span>{event.attendees}/{event.capacity}</span>
              </div>
              <span className="text-xs text-green-600 font-medium">
                {event.capacity - event.attendees} spots left
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (event.attendees / event.capacity) * 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View Details
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1 rounded-md transition-colors">
              Register
            </button>
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
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filterButtons.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Grid of events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
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
        <div className="text-center mt-8">
          <button className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
            Load More Events
          </button>
        </div>
      )}
    </div>
  );
};

export default EventsGrid;