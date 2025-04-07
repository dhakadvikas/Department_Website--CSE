
import React, { useEffect, lazy, Suspense,  memo } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import "./App.css";
import "./index.css";
import HeroSectionSkeleton from "./component/heroSectionSkeleton";

// Configure axios for better performance
axios.defaults.timeout = 10000;
axios.interceptors.request.use(config => {
  config.headers['Cache-Control'] = 'max-age=3600';
  return config;
});

// Eager load critical components
import Head from "./component/Head/Head";
import Nav from "./component/Nav/Nav";

// Lazy load non-critical components
const Footer = lazy(() => import("./component/Footer/Footer"));


// Lazy load page components
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Department = lazy(() => import("./pages/Department/Department"));
const Student = lazy(() => import("./pages/Student/Student"));
const Faculty = lazy(() => import("./pages/Faculty/Faculty"));
const Placement = lazy(() => import("./pages/Placement/Placement"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Events = lazy(() => import("./pages/Events/Events"));

// Optimized route-specific page loading fallbacks
const PageSkeleton = memo(() => (
  <div className="animate-pulse max-w-screen-lg mx-auto p-4">
    <div className="h-64 bg-gray-200 rounded-md mb-4"></div>
    <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded-md w-1/2 mb-2"></div>
  </div>
));

// Scroll to top on route change - memoized for performance
const ScrollToTop = memo(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto' // Using 'auto' instead of 'smooth' for better performance
    });
  }, [pathname]);
  
  return null;
});

const App = () => {

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-50">
      <BrowserRouter>
        {/* Scroll Restoration */}
        <ScrollToTop />

        {/* Header and Navigation - eagerly loaded for better LCP */}
        <Head />
        <Nav />

        {/* Main Content */}
        <main className="flex-grow container w-screen snap-y snap-mandatory max-w-screen mx-auto py-3">
          <Suspense fallback={<HeroSectionSkeleton />}>

            <Routes>
              // default route 
              <Route path="*" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Home />
                </Suspense>
              } />
              
              {/* Page Routes */}
              <Route path="/" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Home />
                </Suspense>
              } />
              <Route path="/about" element={
                <Suspense fallback={<PageSkeleton />}>
                  <About />
                </Suspense>
              } />
              <Route path="/department" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Department />
                </Suspense>
              } />
              <Route path="/student" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Student />
                </Suspense>
              } />
              <Route path="/faculty" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Faculty />
                </Suspense>
              } />
              <Route path="/placement" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Placement />
                </Suspense>
              } />
              <Route path="/event" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Events />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<PageSkeleton />}>
                  <Contact />
                </Suspense>
              } />
            </Routes>
            
            {/* Footer - load after main content */}
            <Suspense fallback={<div className="h-48 bg-gray-100 mt-8"></div>}>
              <Footer />
            </Suspense>
          </Suspense>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default memo(App);