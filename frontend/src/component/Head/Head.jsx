import React from "react";

const Head = () => {
  const api = import.meta.env.VITE_API_URL || '';
  
  return (
    <header className="relative font-['Poppins',sans-serif]">
      {/* Background with overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-blue-800 opacity-95 z-0"></div>
      
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
      
      {/* Top accent bar */}
      <div className="relative z-10">
        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>
        
        {/* Secondary strip with quick links */}
        <div className="bg-white/10 backdrop-blur-sm py-1.5 px-4 text-xs font-medium">
          <div className="container mx-auto flex justify-end space-x-6">
            <a href="https://www.uitrgpv.ac.in/" target="/blank" className="text-amber-200 hover:text-white transition-colors">UIT Main Website</a>
            <a href="https://www.uitrgpv.ac.in/exam/programselect.aspx" target="/blank" className="text-amber-200 hover:text-white transition-colors">Exam Result</a>
            <a href="https://www.uitrgpv.ac.in/studentlife/studentlogin.aspx" target="/blank" className="text-amber-200 hover:text-white transition-colors">Student Portal</a>
            <a href="https://elibrary.rgpv.ac.in/index.aspx" target="/blank" className="text-amber-200 hover:text-white transition-colors">RGPV E-library</a>
            <a href= {`${api}/admin/login`} target="/blank" className="text-amber-200 hover:text-white transition-colors">Admin Portal</a>



            
          </div>
        </div>
      </div>

      {/* Main header content */}
      <div className="relative z-10 container mx-auto px-6 py-5">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          
          {/* Logo and text container */}
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
            {/* Logo with glowing effect */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-white/70 to-white/70 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-white p-1 rounded-full">
                <img
                  className="h-30 w-30 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-105"
                  src="https://www.uitrgpv.ac.in/imagesn/rgpv-logo.jpg"
                  alt="UIT RGPV Logo"
                />
              </div>
            </div>
            
            {/* Text with better typography */}
            {/* <div className="text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-white leading-tight">
                Department of Computer Science & Engineering
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-100 mt-2">
                University Institute of Technology
              </h2>
              <h3 className="text-base text-blue-100 mt-2">
                Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal
              </h3>
              <p className="text-xs font-light mt-1 text-blue-200 italic">
                ( State Technological University of Madhya Pradesh Bhopal (M.P.) )
              </p>
            </div> */}
           {/* 🔹 University Details */}
         <div className="ml-6 text-white">
           <h1 className="text-3xl font-bold tracking-wide text-center">
            Department of Computer Science &  Engineering 
           </h1>
           <h3 className="text-3xl font-bold tracking-wide text-center">
              University Institute of Technology 
           </h3>
           <h4 className="text-center text-gray-300 mt-1">
             Rajiv Gandhi Proudyogiki Vishwavidayalaya ,Bhopal
           </h4>
           <h4 className="text-sm font-medium mt-1 text-gray-300 text-center" >
             ( State Technological University of Madhya Pradesh Bhopal (M.P.) )
           </h4>
         </div>


          </div>
          
          {/* Accreditation badge - optional */}
          {/* <div className="hidden lg:block bg-white/10 backdrop-blur-md p-3 rounded-lg border border-white/20 mt-5 lg:mt-0 transform hover:scale-105 transition-transform">
            <div className="text-center">
              <div className="text-amber-300 text-sm font-bold uppercase tracking-wider mb-1">NAAC Accredited</div>
              <div className="text-2xl font-bold text-white">'A' Grade</div>
              <div className="text-xs text-blue-200 mt-1">Estd. 1998</div>
            </div>
          </div> */}
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <div className="relative z-10 overflow-hidden h-3">
        <div className="w-full h-16 bg-gradient-to-r from-amber-500 to-yellow-500 opacity-20 rounded-[100%] transform translate-y-12"></div>
      </div>
    </header>
  );
};

export default Head;