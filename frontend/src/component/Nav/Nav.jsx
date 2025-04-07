import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Department", path: "/Department" },
    { name: "Student", path: "/student" },
    { name: "Faculty", path: "/faculty" },
    { name: "Placement", path: "/placement" },
    { name: "Events", path: "/event" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 font-['Poppins',sans-serif] shadow-md">
      {/* Gradient background with subtle pattern */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-blue-800">
        {/* Top accent line */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400"></div>
        
        {/* Main navbar content */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Department name/logo - for smaller screens */}
            <div className="lg:hidden">
              <span className="text-xl font-bold text-white tracking-wide">CSE Dept</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-grow">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative mx-1 px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-all duration-300 ${
                      isActive
                        ? "text-indigo-900 bg-gradient-to-r from-amber-300 to-yellow-400 font-bold shadow-md"
                        : "text-white hover:bg-white/10 backdrop-blur-sm"
                    }`
                  }
                >
                  {item.name}
                  
                  {/* Animated underline effect on hover (only for inactive items) */}
                  {({ isActive }) => !isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                  )}
                </NavLink>
              ))}
            </div>
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden rounded-full p-2 text-white hover:bg-white/10 transition-colors focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <IoClose className="text-2xl" />
              ) : (
                <CgMenuRightAlt className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-indigo-900/95 backdrop-blur-sm shadow-lg border-t border-indigo-800 z-50"
            >
              <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "text-indigo-900 bg-gradient-to-r from-amber-300 to-yellow-400 font-bold shadow-inner"
                            : "text-white hover:bg-white/10"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Nav;
