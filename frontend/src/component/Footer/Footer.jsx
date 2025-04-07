import React from "react";
import { Link } from "react-router-dom";
import { 
  IoCall, 
  IoMailSharp, 
  IoLocation, 
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoYoutube,
  IoLogoInstagram,
  IoSchool,
  IoCalendar,
  IoDocument,
  IoLibrary,
  IoPersonCircle
} from "react-icons/io5";

function Footer() { 
  return (
    <footer className="relative font-['Poppins',sans-serif] text-white overflow-hidden">
      {/* Background with overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-blue-800 opacity-95 z-0"></div>
      
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0"></div>
      
      {/* Top wave decoration */}
      <div className="relative h-8 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/5 rounded-[100%] transform -translate-y-10"></div>
      </div>
      
      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Contact Info */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 transform transition-transform hover:scale-[1.01] border border-white/10">
            <h3 className="text-xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-x-3 group">
                <div className="p-2 bg-indigo-800/50 rounded-full group-hover:bg-amber-500 transition-colors">
                  <IoMailSharp className="text-amber-200 group-hover:text-white transition-colors" /> 
                </div>
                <a href="mailto:uit_director@rgtu.net" className="group-hover:text-amber-200 transition-colors">
                  uit_director@rgtu.net
                </a>
              </li>
              <li className="flex items-center gap-x-3 group">
                <div className="p-2 bg-indigo-800/50 rounded-full group-hover:bg-amber-500 transition-colors">
                  <IoCall className="text-amber-200 group-hover:text-white transition-colors" /> 
                </div>
                <a href="tel:+917552678812" className="group-hover:text-amber-200 transition-colors">
                  +(91)-(755)-2678812
                </a>
              </li>
              <li className="flex items-center gap-x-3 group">
                <div className="p-2 bg-indigo-800/50 rounded-full group-hover:bg-amber-500 transition-colors">
                  <IoCall className="text-amber-200 group-hover:text-white transition-colors" />
                </div>
                <span className="group-hover:text-amber-200 transition-colors">+(91)-(755)-2678819</span>
              </li>
              <li className="flex items-start gap-x-3 group">
                <div className="p-2 bg-indigo-800/50 rounded-full group-hover:bg-amber-500 transition-colors mt-1">
                  <IoLocation className="text-amber-200 group-hover:text-white transition-colors" /> 
                </div>
                <span className="group-hover:text-amber-200 transition-colors">Narsingharh By pass Road, Near Gandhi Nagar, Bhopal M.P</span>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 transform transition-transform hover:scale-[1.01] border border-white/10">
            <h3 className="text-xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 pb-2 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Department", path: "/department" },
                { name: "Faculty", path: "/faculty" },
                { name: "Contact", path: "/contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="group flex items-center gap-x-2 py-1 hover:translate-x-1 transition-transform"
                  >
                    <span className="text-amber-400 text-lg group-hover:text-amber-200">›</span> 
                    <span className="group-hover:text-amber-200 transition-colors">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 transform transition-transform hover:scale-[1.01] border border-white/10">
            <h3 className="text-xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 pb-2 inline-block">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.uitrgpv.ac.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-x-3 py-1 hover:translate-x-1 transition-transform"
                >
                  <div className="p-1.5 bg-indigo-800/50 rounded-full">
                    <IoSchool className="text-amber-200 text-sm" />
                  </div>
                  <span className="group-hover:text-amber-200 transition-colors">UIT Main Website</span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="group flex items-center gap-x-3 py-1 hover:translate-x-1 transition-transform"
                >
                  <div className="p-1.5 bg-indigo-800/50 rounded-full">
                    <IoCalendar className="text-amber-200 text-sm" />
                  </div>
                  <span className="group-hover:text-amber-200 transition-colors">Academic Calendar</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.uitrgpv.ac.in/exam/programselect.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-x-3 py-1 hover:translate-x-1 transition-transform"
                >
                  <div className="p-1.5 bg-indigo-800/50 rounded-full">
                    <IoDocument className="text-amber-200 text-sm" />
                  </div>
                  <span className="group-hover:text-amber-200 transition-colors">Exam Results</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://elibrary.rgpv.ac.in/index.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-x-3 py-1 hover:translate-x-1 transition-transform"
                >
                  <div className="p-1.5 bg-indigo-800/50 rounded-full">
                    <IoLibrary className="text-amber-200 text-sm" />
                  </div>
                  <span className="group-hover:text-amber-200 transition-colors">RGPV E-Library</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.uitrgpv.ac.in/studentlife/studentlogin.aspx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center gap-x-3 py-1 hover:translate-x-1 transition-transform"
                >
                  <div className="p-1.5 bg-indigo-800/50 rounded-full">
                    <IoPersonCircle className="text-amber-200 text-sm" />
                  </div>
                  <span className="group-hover:text-amber-200 transition-colors">Student Portal</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 transform transition-transform hover:scale-[1.01] border border-white/10">
            <h3 className="text-xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 pb-2 inline-block">
              Connect With Us
            </h3>
            
            {/* Social Media */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {[
                { icon: <IoLogoFacebook />, url: "#", color: "from-blue-600 to-blue-400" },
                { icon: <IoLogoTwitter />, url: "#", color: "from-sky-600 to-sky-400" },
                { icon: <IoLogoLinkedin />, url: "#", color: "from-blue-800 to-blue-600" },
                { icon: <IoLogoYoutube />, url: "#", color: "from-red-600 to-red-500" },
                { icon: <IoLogoInstagram />, url: "#", color: "from-pink-600 to-purple-600" },
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-full blur-sm transition-opacity" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}} />
                  <div className="relative flex items-center justify-center aspect-square p-3 bg-indigo-800/40 backdrop-blur-sm rounded-full border border-white/10 group-hover:border-amber-400/30 group-hover:bg-indigo-700/60 transition-all">
                    <span className="text-lg text-white group-hover:text-amber-200 transition-colors">
                      {social.icon}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            
            {/* Location Map */}
            <div className="mt-4">
              <div className="relative overflow-hidden rounded-lg h-[140px] group">
                {/* Static map background image - could be replaced with an actual embedded map */}
                <div className="absolute inset-0 bg-indigo-800/40 backdrop-blur-sm group-hover:bg-indigo-800/20 transition-all duration-500"></div>
                <a 
                  href="https://maps.app.goo.gl/ReRb2q4pAWZB6zn86" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
                >
                  <div className="p-2 bg-indigo-900/70 backdrop-blur-sm rounded-full mb-2 group-hover:bg-amber-500 transition-colors">
                    <IoLocation className="text-2xl text-amber-200 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-white text-sm font-medium group-hover:text-amber-200 transition-colors">View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="relative z-10 h-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-amber-500/10 to-amber-400/10 rounded-[100%] transform translate-y-10"></div>
      </div>
      
      {/* Bottom Copyright Bar */}
      <div className="relative z-10 bg-black/30 backdrop-blur-sm py-4 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-amber-100/60 text-sm">
            © 2025 <span className="text-amber-200">UIT-RGPV</span> Department of Computer Science. All Rights Reserved.
          </p>
          <div className="mt-3 md:mt-0">
            <ul className="flex gap-6 text-xs text-amber-100/60">
              <li><a href="#" className="hover:text-amber-200 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-amber-200 transition-colors">Site Map</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;