import React from 'react';
import MagzineImage from '../../assets/magzine.jpg';


const Magzine = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
     
      
      {/* Magazine Section */}
      <section id="magazine" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 relative">
            <span className="inline-block relative">
              Department Magazine
              <span className="absolute h-1 w-24 bg-blue-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-3"></span>
            </span>
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Latest Issue */}
            <div className="lg:w-3/5">
              <h3 className="text-2xl font-semibold mb-5 text-gray-700">Latest Issue:  ABHIKALITRYANTRIKI</h3>
              <div className="bg-white min-h-86 rounded-xl shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1 duration-300">
                <div className="md:flex">
                  <div className="md:w-2/5">
                    <img 
                      src={MagzineImage} 
                      alt="Magazine Cover" 
                      className="w-full h-56 md:h-86 object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-3/5">
                    <h4 className="text-xl font-medium text-gray-800 mb-3">ABHIKALITRYANTRIKI</h4>
                    <p className="text-gray-600 mb-5">Featuring articles on emerging technologies, student projects, faculty research highlights, and department achievements.</p>
                    <div className="flex flex-wrap gap-3">
                        <a href="https://res.cloudinary.com/dhakad/image/upload/v1748020175/abhikalitryantriki2024_rf0reb.pdf" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-full transition-colors duration-300 inline-flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          <span>Read Online</span>
                        </a>
                      <a href="https://res.cloudinary.com/dhakad/image/upload/v1748020175/abhikalitryantriki2024_rf0reb.pdf" target='_blank' className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-5 rounded-full transition-colors duration-300 inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="lg:w-2/5">
              <h3 className="text-2xl font-semibold mb-5 text-gray-700">Newsletter</h3>
              <div className="bg-white rounded-xl shadow-md">
                <div className="divide-y divide-gray-100">
                  <div className="p-4 flex justify-between items-center hover:bg-gray-50 rounded-t-xl transition-colors duration-200">
                    <div>
                      <span className="block text-lg font-medium text-gray-800">Volume 4 Issue 1</span>
                      <span className="text-sm text-gray-500">winter 2024</span>
                    </div>
                    <a href="https://res.cloudinary.com/dhakad/image/upload/v1748020935/file2024_pxsivm.pdf"  target='_blank' className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
                      View
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
                    <div>
                      <span className="block text-lg font-medium text-gray-800">Volume 3, Issue 2</span>
                      <span className="text-sm text-gray-500">Fall 2023</span>
                    </div>
                    <a href="https://res.cloudinary.com/dhakad/image/upload/v1748020935/file2023_iadax1.pdf" target='_blank' className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
                      View
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
                    <div>
                      <span className="block text-lg font-medium text-gray-800">Volume 2, Issue 1</span>
                      <span className="text-sm text-gray-500">Spring 2022</span>
                    </div>
                    <a href="https://res.cloudinary.com/dhakad/image/upload/v1748020935/file2022_zhf1wh.pdf" target='_blank' className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
                      View
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  <div className="p-4 flex justify-between items-center hover:bg-gray-50 rounded-b-xl transition-colors duration-200">
                    <div>
                      <span className="block text-lg font-medium text-gray-800">Volume 1, Issue 2</span>
                      <span className="text-sm text-gray-500">Fall 2021</span>
                    </div>
                    <a href="https://res.cloudinary.com/dhakad/image/upload/v1748020935/file2021_oevl40.pdf" target='_blank' className="text-blue-600 hover:text-blue-800 flex items-center font-medium">
                      View
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* Alumni Section */}
      <section id="alumni" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 relative">
            <span className="inline-block relative">
              Alumni Network
              <span className="absolute h-1 w-24 bg-blue-500 bottom-0 left-1/2 transform -translate-x-1/2 -mb-3"></span>
            </span>
          </h2>
          
          <div className="text-center mb-10">
            <p className="text-lg text-gray-600 mb-5 max-w-3xl mx-auto">
              Our alumni are making significant contributions across various industries worldwide. 
              The RGPV Campus Alumni network connects former students with current faculty and students, 
              fostering collaboration and mentorship.
            </p>
            <a 
              href="https://www.rgpvcampusalumni.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              Visit Alumni Portal
            </a>
          </div>
          
          {/* Notable Alumni */}
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">Notable Alumni</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://vaave.s3.amazonaws.com/album_photos/851f5ac9941d720844d143ed9cfcf60a_54214ffab0d2ae5ab3a8191c5ac56018_thumb.jpg" 
                  alt="Rajesh Kumar" 
                  className="w-full h-full "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h4 className="text-xl font-medium">Rajesh Kumar</h4>
                    <p className="text-sm opacity-90">Class of 2010</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 font-medium">Senior Software Engineer, Google</p>
                <p className="mt-2 text-gray-600 text-sm">
                  Leading AI/ML initiatives and contributing to open-source projects. 
                  Has published multiple research papers on distributed systems.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://vaave.s3.amazonaws.com/album_photos/851f5ac9941d720844d143ed9cfcf60a_86a091e128d386d472b87c3cc93a6b38_thumb.jpg" 
                  alt="Priya Sharma" 
                  className="w-full h-full "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h4 className="text-xl font-medium">Priya Sharma</h4>
                    <p className="text-sm opacity-90">Class of 2012</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 font-medium">Tech Lead, Microsoft</p>
                <p className="mt-2 text-gray-600 text-sm">
                  Currently leading a team of engineers working on cloud infrastructure. 
                  Regular speaker at technology conferences and active mentor.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src="https://vaave.s3.amazonaws.com/album_photos/851f5ac9941d720844d143ed9cfcf60a_5c64d34d5a5de1606ac892b09ad70309_thumb.jpg" 
                  alt="Amit Patel" 
                  className="w-full h-full "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h4 className="text-xl font-medium">Amit Patel</h4>
                    <p className="text-sm opacity-90">Class of 2008</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 font-medium">Founder & CEO, TechSolutions</p>
                <p className="mt-2 text-gray-600 text-sm">
                  Founded a successful startup focused on cybersecurity solutions.
                  Named in Forbes 30 Under 30 and frequently returns to campus as a guest lecturer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    

  
        
    </div>
    );
  };
export default Magzine;