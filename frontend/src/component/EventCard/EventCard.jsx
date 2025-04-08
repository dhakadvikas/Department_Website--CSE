import React from 'react';
const apiUrl = import.meta.env.VITE_API_URL;



const EventCard = ({ event }) => {
  const { title, details, status, date, file } = event;
  
  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Set status badge color
  const getStatusBadge = () => {
    switch(status) {
      case 'upcoming':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Upcoming</span>;
      case 'ongoing':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Ongoing</span>;
      case 'completed':
        return <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span>;
      default:
        return null;
    }
  };

  // Extract file name from path for display
  const fileName = file ? file.split('\\').pop() : 'No attachment';
  const isImage = fileName.match(/\.(jpeg|jpg|gif|png)$/i);
// console.log("FILE" , file);
// console.log("IS IMAGE", isImage);
//   console.log("FILe NAME", fileName);

  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          {getStatusBadge()}
        </div>
        
        {isImage && (
          <div className="mb-4 h-48 overflow-hidden">
            <img 
              src={`${fileName}`} 
             
              alt={title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400?text=Image+Not+Available';
              }}
            />
          </div>
        )}
        
        <p className="text-gray-600 mb-4">{details}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>{formattedDate}</span>
          </div>
          
          {!isImage && file && (
            <a 
              href={`/api/uploads/${fileName}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              View Attachment
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;


























// import React from 'react';
// import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

// const EventCard = ({ event }) => {
//   // Sample event if none provided
//   const defaultEvent = {
//     id: 1,
//     title: "AI & Machine Learning Workshop",
//     department: "Computer Science",
//     type: "workshop",
//     date: "March 20, 2025",
//     time: "2:00 PM - 5:00 PM",
//     location: "Tech Building, Room 305",
//     imageUrl: "/api/placeholder/400/200",
//     featured: true,
//     attendees: 45,
//     capacity: 60,
//     description: "Join us for an interactive workshop on the latest developments in AI and machine learning technologies."
//   };

//   // Use provided event or default
//   const eventData = event || defaultEvent;
  
//   // Dynamic badge color based on event type
//   const getBadgeColor = (type) => {
//     const colors = {
//       workshop: "bg-blue-500",
//       cultural: "bg-purple-500",
//       academic: "bg-green-500",
//       competition: "bg-orange-500",
//       conference: "bg-red-500"
//     };
//     return colors[type] || "bg-gray-500";
//   };

//   return (
//     <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1">
//       {/* Event Image */}
//       <div className="relative">
//         <img src={eventData.imageUrl} alt={eventData.title} className="w-full h-48 object-cover" />
        
//         {/* Featured Badge */}
//         {eventData.featured && (
//           <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 flex items-center rounded-bl-lg">
//             <Star size={14} className="mr-1" />
//             <span className="text-xs font-medium">Featured</span>
//           </div>
//         )}
        
//         {/* Event Type Badge */}
//         <div className={`absolute top-0 left-0 ${getBadgeColor(eventData.type)} text-white px-3 py-1 text-xs font-medium rounded-br-lg`}>
//           {eventData.type.charAt(0).toUpperCase() + eventData.type.slice(1)}
//         </div>
//       </div>
      
//       {/* Event Details */}
//       <div className="p-4">
//         <div className="flex justify-between items-start">
//           <h3 className="text-lg font-bold text-gray-800 mb-1">{eventData.title}</h3>
//           {/* Department Tag */}
//           <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
//             {eventData.department}
//           </span>
//         </div>
        
//         <p className="text-gray-600 text-sm mb-4 line-clamp-2">{eventData.description}</p>
        
//         {/* Event Meta Info */}
//         <div className="space-y-2 text-sm">
//           <div className="flex items-center text-gray-700">
//             <Calendar size={14} className="mr-2" />
//             <span>{eventData.date}</span>
//           </div>
          
//           <div className="flex items-center text-gray-700">
//             <Clock size={14} className="mr-2" />
//             <span>{eventData.time}</span>
//           </div>
          
//           <div className="flex items-center text-gray-700">
//             <MapPin size={14} className="mr-2" />
//             <span>{eventData.location}</span>
//           </div>
//         </div>
        
//         {/* Registration Status */}
//         <div className="mt-4">
//           <div className="flex justify-between items-center mb-2">
//             <div className="flex items-center text-sm text-gray-600">
//               <Users size={14} className="mr-1" />
//               <span>{eventData.attendees}/{eventData.capacity}</span>
//             </div>
//             <span className="text-xs text-green-600 font-medium">
//               {eventData.capacity - eventData.attendees} spots left
//             </span>
//           </div>
          
//           {/* Progress Bar */}
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full" 
//               style={{ width: `${Math.min(100, (eventData.attendees / eventData.capacity) * 100)}%` }}
//             ></div>
//           </div>
//         </div>
        
//         {/* Actions */}
//         <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
//           <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
//             View Details
//           </button>
//           <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-1 rounded-md transition-colors">
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;