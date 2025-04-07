import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Calendar, Code, Monitor, Globe, Award, Users, 
  BookOpen, Shield, Cpu, Server, 
   Calendar as CalendarIcon, Star 
  , BrainCircuit, 
    Handshake,
} from 'lucide-react';
import EventCard from '../../component/EventCard/EventCard';
import eventBanner from '../../assets/eventBanner.AVIF'; // Adjust the path as necessary


const apiUrl = import.meta.env.VITE_API_URL;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');


  // Categories specific to CSE events
  const categories = [
    { id: 'all', name: 'All Events', icon: <Calendar size={20} /> },
    { id: 'hackathon', name: 'Hackathons', icon: <Code size={20} /> },
    { id: 'workshop', name: 'Workshops', icon: <Monitor size={20} /> },
    { id: 'conference', name: 'Conferences', icon: <Globe size={20} /> },
    { id: 'competition', name: 'Competitions', icon: <Award size={20} /> },
    { id: 'networking', name: 'Networking', icon: <Users size={20} /> },
    { id: 'seminar', name: 'Tech Talks', icon: <BookOpen size={20} /> },
    { id: 'security', name: 'Security Events', icon: <Shield size={20} /> },
    { id: 'ai', name: 'AI/ML Events', icon: <Cpu size={20} /> },
    { id: 'opensource', name: 'Open Source', icon: <Server size={20} /> },
  ];

  // Event stats - in a real app, these would be calculated from actual data
  const eventStats = [
    { label: 'Total Events', value: '120+', icon: <Calendar size={24} />, color: 'bg-blue-500' },
    { label: 'Students Engaged', value: '2,500+', icon: <Users size={24} />, color: 'bg-green-500' },
    { label: 'Partners', value: '35+', icon: <Handshake size={24} />, color: 'bg-purple-500' },
    { label: 'Success Rate', value: '95%', icon: <Star size={24} />, color: 'bg-amber-500' },
  ];

  // Highlighted event benefits
  const eventBenefits = [
    { 
      title: "Network with Industry Experts", 
      description: "Connect with professionals from top tech companies like Google, Microsoft, and startups.",
      icon: <Users size={24} />,
      color: "from-blue-500 to-blue-600" 
    },
    { 
      title: "Enhance Technical Skills", 
      description: "Learn cutting-edge technologies through hands-on workshops and coding sessions.",
      icon: <Code size={24} />,
      color: "from-purple-500 to-purple-600" 
    },
    { 
      title: "Build Your Portfolio", 
      description: "Work on real-world projects that you can showcase to future employers.",
      icon: <BrainCircuit size={24} />,
      color: "from-green-500 to-green-600" 
    },
    { 
      title: "Win Exciting Prizes", 
      description: "Compete in hackathons and competitions with rewards worth thousands of dollars.",
      icon: <Award size={24} />,
      color: "from-amber-500 to-amber-600" 
    },
  ];

  // Testimonials from past events
  const testimonials = [
    {
      quote: "The AI Workshop completely changed my understanding of machine learning. I built my first neural network and won the department hackathon!",
      name: "Alex Chen",
      role: "3rd Year CSE Student",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The industry networking events helped me secure an internship at Google. The connections I made were invaluable for my career.",
      name: "Priya Sharma",
      role: "Final Year CSE Student",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "The cybersecurity CTF competition was challenging and fun. I learned more in those 48 hours than in an entire semester.",
      name: "Jordan Williams",
      role: "2nd Year CSE Student",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/events`);
        setEvents(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events. Please try again later.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Apply multiple filters
  const filteredEvents = events.filter(event => {
    const matchesStatus = activeFilter === 'all' || event.status === activeFilter;
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Group for displaying count in filter buttons
  const statusCounts = events.reduce((counts, event) => {
    const status = event.status || 'unknown';
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  // Group for category counts
  const categoryCounts = events.reduce((counts, event) => {
    const category = event.category || 'unknown';
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});

  // Featured event (most recent upcoming event)
  const featuredEvent = events.find(event => event.status === 'upcoming');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with 3D and Animation Effects */}
      <div className="relative overflow-hidden bg-[#0F172A] text-white">
       
        
        {/* Hero Content */}


        <div className="relative  text-white">
            <div className="absolute inset-0 opacity-20">
              <img 
                src= {eventBanner}
                alt="Faculty background" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="container mx-auto px-6 py-24 relative z-10">
              {/* <h1 className="text-5xl font-bold mb-6">Meet Our Faculty</h1> */}
              <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-6xl lg:text-5xl">
              <span className="block">Discover</span>
              <span className="block mt-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tech Events & Opportunities
              </span>
            </h1>
              <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
              Explore hackathons, workshops, tech talks, and networking opportunities designed to enhance your skills and build your future in technology.
            </p>
            </div>
          </div>
        
      </div>

   

      <div className="container mx-auto px-4 py-8">
    


       

        {/* Status Filter Pills */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === 'all' 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}
            >
              All Events ({events.length})
            </button>
            <button 
              onClick={() => setActiveFilter('upcoming')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === 'upcoming' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-green-600 border border-green-200 hover:bg-green-50'}`}
            >
              Upcoming ({statusCounts.upcoming || 0})
            </button>
            <button 
              onClick={() => setActiveFilter('ongoing')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === 'ongoing' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}`}
            >
              Ongoing ({statusCounts.ongoing || 0})
            </button>
            <button 
              onClick={() => setActiveFilter('completed')}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeFilter === 'completed' 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50'}`}
            >
              Completed ({statusCounts.completed || 0})
            </button>
          </div>
        </section>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Event Cards Grid */}
        {!loading && !error && (
          <section className="mb-16">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg shadow">
                <img 
                  src="https://illustrations.popsy.co/amber/no-results.svg" 
                  alt="No events found" 
                  className="w-48 h-48 mx-auto mb-6"
                />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No matching events found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button 
                  onClick={() => {
                    setActiveFilter('all');
                    setActiveCategory('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </section>
        )}
        
           {/* Why Attend Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Why Attend CSE Events?</h2>
            <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
              Our department offers various technology-focused events designed to enhance your skills and career prospects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className={`h-2 bg-gradient-to-r ${benefit.color}`}></div>
                <div className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${benefit.color} text-white mb-4`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
     
      </div>
    </div>
  );
}

export default Events;
