import React from 'react';
import { FaCalendarAlt, FaNewspaper, FaArrowRight, FaDownload, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Magazine = () => {
    // Sample data - in a real application, this would come from an API or props
    const magazineData = {
        title: "CS Chronicles",
        issue: "Vol. 12, Issue 3",
        date: "October 2023",
        featuredArticle: {
            title: "Advancements in Natural Language Processing",
            author: "Dr. Sarah Johnson",
            image: "https://images.unsplash.com/photo-1655720828018-ad4b810ac082?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            summary: "Exploring how recent innovations in NLP are transforming human-computer interaction with breakthrough models like GPT-4 and Claude 3.7 Sonnet offering unprecedented capabilities in language understanding and generation."
        },
        articles: [
            {
                id: 1,
                title: "Student Team Wins National Hackathon",
                author: "Prof. Michael Chen",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                category: "Achievement",
                snippet: "Our CS students demonstrated exceptional skill in developing solutions for smart cities."
            },
            {
                id: 2,
                title: "Faculty Research Spotlight: Quantum Computing",
                author: "Dr. Emma Williams",
                image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                category: "Research",
                snippet: "A breakthrough in quantum algorithm design promises to solve complex problems faster."
            },
            {
                id: 3,
                title: "New AI Lab Inaugurated",
                author: "Tech Committee",
                image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                category: "Infrastructure",
                snippet: "State-of-the-art facilities now available for students to explore artificial intelligence."
            },
            {
                id: 4,
                title: "Industry Partnership: Internship Opportunities",
                author: "Career Cell",
                image: "https://images.unsplash.com/photo-1559484101-9c6be5b712cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                category: "Opportunities",
                snippet: "Leading tech companies announce exclusive internship programs for our students."
            }
        ],
        newsletters: [
            { 
                id: 1, 
                title: "Spring 2023 Newsletter", 
                cover: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                downloadLink: "#"
            },
            { 
                id: 2, 
                title: "Winter 2022 Newsletter", 
                cover: "https://images.unsplash.com/photo-1549675584-91f19b5ae992?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                downloadLink: "#"
            },
            { 
                id: 3, 
                title: "Fall 2022 Newsletter", 
                cover: "https://images.unsplash.com/photo-1634128222187-17f3a8a28bc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                downloadLink: "#"
            }
        ],
        events: [
            { 
                id: 1, 
                name: "Annual Technical Symposium", 
                date: "November 15-17, 2023",
                location: "Main Auditorium",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            },
            { 
                id: 2, 
                name: "Workshop on Cybersecurity", 
                date: "October 25, 2023",
                location: "Lab Complex, Floor 2",
                image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            },
            { 
                id: 3, 
                name: "Guest Lecture: ML in Healthcare", 
                date: "November 5, 2023",
                location: "Virtual (Zoom)",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            },
            { 
                id: 4, 
                name: "Code Jam Competition", 
                date: "December 10, 2023",
                location: "Computer Lab 103",
                image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
            }
        ],
        featuredSpotlight: {
            title: "Alumnus Success Story: Leading AI Innovation at Google",
            image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            text: "Dr. Ramesh Patel (Batch of 2015) shares his journey from our classrooms to Silicon Valley."
        }
    };

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-12">
            {/* Magazine Header */}
            <div className="relative h-72 bg-gradient-to-r from-indigo-600 to-blue-700 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}></div>
                <div className="container mx-auto px-6 h-full flex items-center">
                    <div className="max-w-4xl">
                        <div className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded text-sm font-semibold text-blue-100 mb-4">
                            {magazineData.issue} • {magazineData.date}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tighter">
                            {magazineData.title}
                        </h1>
                        <p className="text-blue-100 text-xl max-w-2xl">
                            The official magazine of the Computer Science & Engineering Department, highlighting our achievements, research, and community.
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
                {/* Featured Article Card */}
                <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-16">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img 
                                src={magazineData.featuredArticle.image} 
                                alt={magazineData.featuredArticle.title} 
                                className="w-full h-64 md:h-full object-cover"
                            />
                        </div>
                        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-4">
                                FEATURED ARTICLE
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                {magazineData.featuredArticle.title}
                            </h2>
                            <p className="text-sm text-blue-600 font-medium mb-3">
                                By {magazineData.featuredArticle.author}
                            </p>
                            <p className="text-gray-600 mb-6">
                                {magazineData.featuredArticle.summary}
                            </p>
                            {/* <button className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors self-start">
                                Read Full Article
                                <FaArrowRight className="ml-2" />
                            </button> */}
                        </div>
                    </div>
                </div>
                
                {/* Department News & Highlights */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Department News & Highlights
                        </h2>
                        {/* <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm">
                            View all articles <FaArrowRight className="ml-1" />
                        </a> */}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {magazineData.articles.map(article => (
                            <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
                                <img 
                                    src={article.image} 
                                    alt={article.title} 
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {article.category}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{article.title}</h3>
                                    <p className="text-xs text-gray-500 mb-2">By {article.author}</p>
                                    <p className="text-gray-600 text-sm mb-4 flex-grow">{article.snippet}</p>
                                    {/* <a 
                                        href="#" 
                                        className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium"
                                    >
                                        Continue reading <FaArrowRight className="ml-1" size={12} />
                                    </a> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Previous Newsletters */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                        Previous Newsletters
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {magazineData.newsletters.map(newsletter => (
                            <div key={newsletter.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={newsletter.cover} 
                                        alt={newsletter.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                        <div className="p-4 w-full">
                                            <h3 className="text-lg font-bold text-white mb-2">
                                                {newsletter.title}
                                            </h3>
                                            {/* <a 
                                                href={newsletter.downloadLink}
                                                className="inline-flex items-center text-white bg-blue-600/90 hover:bg-blue-700 text-xs font-medium rounded px-3 py-1.5 transition-colors"
                                            >
                                                <FaDownload className="mr-1" /> Download PDF
                                            </a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Featured Spotlight */}
                {/* <div className="mb-16">
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl overflow-hidden shadow-md">
                        <div className="md:flex">
                            <div className="md:w-2/5">
                                <img
                                    src={magazineData.featuredSpotlight.image}
                                    alt="Alumni spotlight"
                                    className="w-full h-64 md:h-full object-cover"
                                />
                            </div>
                            <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                                <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-4">
                                    ALUMNI SPOTLIGHT
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    {magazineData.featuredSpotlight.title}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    {magazineData.featuredSpotlight.text}
                                </p>
                                <button className="inline-flex items-center text-indigo-700 hover:text-indigo-800 font-medium text-sm transition-colors self-start group">
                                    Read the interview
                                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}
                
                {/* Upcoming Events */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Upcoming Events
                        </h2>
                        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm">
                            View full calendar <FaArrowRight className="ml-1" />
                        </a>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {magazineData.events.map(event => (
                            <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                                <div className="relative h-40">
                                    <img 
                                        src={event.image} 
                                        alt={event.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-semibold text-blue-800 inline-flex items-center">
                                        <FaCalendarAlt className="mr-1" /> {event.date}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800 mb-2">{event.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{event.location}</p>
                                    <a 
                                        href="#" 
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
                                    >
                                        Learn more <FaArrowRight className="ml-1" size={10} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Department Stats */}
                <div className="mb-16 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-xl shadow-xl p-8 md:p-10 text-white">
                    <h3 className="text-2xl font-bold mb-8 text-center">Department at a Glance</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="p-4">
                            <div className="text-4xl md:text-5xl font-bold mb-2">42</div>
                            <div className="text-blue-200">Faculty Members</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl md:text-5xl font-bold mb-2">850+</div>
                            <div className="text-blue-200">Students</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl md:text-5xl font-bold mb-2">25</div>
                            <div className="text-blue-200">Research Labs</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl md:text-5xl font-bold mb-2">95%</div>
                            <div className="text-blue-200">Placement Rate</div>
                        </div>
                    </div>
                </div>
                
                {/* Call to Action */}
                {/* <div className="mb-16 bg-gray-50 rounded-xl p-6 md:p-8 text-center">
                    <div className="inline-flex items-center justify-center mb-4">
                        <FaNewspaper className="text-blue-600 text-xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">Contribute to Our Next Issue</h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Share your research, achievements, or departmental news in our upcoming issue.
                        Submissions for the Winter 2023 edition are now open.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors">
                        Submit Your Article
                    </button>
                </div> */}
                
                {/* Footer */}
                <footer className="bg-white rounded-lg shadow-md p-6">
                    <div className="md:flex md:justify-between items-center">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                <span className="text-blue-600 mr-2">CS</span> Chronicles
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">© 2023 Department of Computer Science & Engineering</p>
                        </div>
                        
                        <div className="md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <p className="text-sm text-gray-600">
                                For contributions and inquiries: <span className="font-medium">csemagazine@university.edu</span>
                            </p>
                            
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                                    <FaLinkedinIn size={20} />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                                    <FaInstagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Magazine;