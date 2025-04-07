import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
const apiUrl = import.meta.env.VITE_API_URL;


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

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

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.status === activeFilter);

  // Group for displaying count in filter buttons
  const eventCounts = events.reduce((counts, event) => {
    const status = event.status || 'unknown';
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">College Events</h1>
      
      {/* Status Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full ${activeFilter === 'all' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 text-gray-700'}`}
        >
          All Events ({events.length})
        </button>
        <button 
          onClick={() => setActiveFilter('upcoming')}
          className={`px-4 py-2 rounded-full ${activeFilter === 'upcoming' 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-200 text-gray-700'}`}
        >
          Upcoming ({eventCounts.upcoming || 0})
        </button>
        <button 
          onClick={() => setActiveFilter('ongoing')}
          className={`px-4 py-2 rounded-full ${activeFilter === 'ongoing' 
            ? 'bg-yellow-600 text-white' 
            : 'bg-gray-200 text-gray-700'}`}
        >
          Ongoing ({eventCounts.ongoing || 0})
        </button>
        <button 
          onClick={() => setActiveFilter('completed')}
          className={`px-4 py-2 rounded-full ${activeFilter === 'completed' 
            ? 'bg-purple-600 text-white' 
            : 'bg-gray-200 text-gray-700'}`}
        >
          Completed ({eventCounts.completed || 0})
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Event Cards Grid */}
      {!loading && !error && (
        <>
          {filteredEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No {activeFilter !== 'all' ? activeFilter : ''} events found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventList;