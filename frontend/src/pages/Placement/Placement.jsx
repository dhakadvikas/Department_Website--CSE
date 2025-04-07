import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaChartLine, FaHandshake } from 'react-icons/fa';
import AboutPlacement from "../../component/AboutPlacement/AboutPlacement.jsx";
import StudentPlacementData from "../../component/StudentPlacementData/StudentPlacementData.jsx";
import TCS_logo from "../../assets/TCS_logo.svg";
import Cognizant_logo from "../../assets/Cognizant_logo.svg.png";
import IBM_logo from "../../assets/IBM_logo.svg.png";
import Deloitte_logo from "../../assets/Deloitte_logo.jpg";
import Bajaj_logo from "../../assets/Bajaj_logo.png";
import Tejas_logo from "../../assets/Tejas_logo.svg";
import jaro_education from "../../assets/jaro_education_Logo.png";
import persistent_logo from "../../assets/persistent_logo.png";


// Mock data for CS placement statistics
const placementStats = [
  { id: 1, title: "Placement Rate", value: "92%", icon: <FaChartLine className="text-3xl text-blue-600" /> },
  { id: 2, title: "Avg. Package", value: "₹8.2 LPA", icon: <FaChartLine className="text-3xl text-blue-600" /> },
  { id: 3, title: "Highest Package", value: "₹42 LPA", icon: <FaChartLine className="text-3xl text-blue-600" /> },
  { id: 4, title: "Companies Visited", value: "120+", icon: <FaHandshake className="text-3xl text-blue-600" /> },
];

// Mock data for top recruiting companies
const topCompanies = [
  { 
    id: 1, 
    name: "IBM",
    logo: IBM_logo,
    roles: ["Software Engineer", "Data Analyst", "Cloud Consultant"],
    avgPackage: "₹12 LPA"
  },
  
  { 
    id: 2, 
    name: "Cognizant",
    logo: Cognizant_logo,
    roles: ["Associate", "Programmer Analyst", "Data Scientist"],
    avgPackage: "₹8 LPA" 
    
  },

  { 
    id: 3, 
    name: "Deloitte",
    logo: Deloitte_logo,
    roles: ["Consultant", "Analyst", "Software Engineer"],
    avgPackage: "₹10 LPA" 
  
  },
  { 
    id: 4, 
    name: "TCS", 
    logo: TCS_logo,
    roles: ["System Engineer", "Digital Specialist", "Full Stack Developer"],
    avgPackage: "₹7 LPA"
  },
  { 
    id: 5, 
    name: "Bajaj Finserv",
    logo: Bajaj_logo,
    roles: ["Software Developer", "Business Analyst", "Data Engineer"],
    avgPackage: "₹9 LPA"
  },
  { 
    id: 6, 
    name: "Tejas Networks",
    logo: Tejas_logo,
    roles: ["Network Engineer", "Software Developer", "System Administrator"],
    avgPackage: "₹7.5 LPA" 
   
  },
  { 
    id: 7, 
    name: "Persistent Systems",
    logo: persistent_logo,
    roles: ["Software Engineer", "Data Scientist", "DevOps Engineer"],
    avgPackage: "₹10 LPA" 
  },
  { 
    id: 8, 
    name: "Jaro Education",
    logo: jaro_education,
    roles: ["Business Development", "Sales Executive", "Marketing Associate"],
    avgPackage: "₹6 LPA"
  }
];

// Mock data for industry partners
const industryPartners = [
  { id: 1, name: "TCS", logo: TCS_logo },
  { id: 2, name: "Cognizant", logo: Cognizant_logo },
  { id: 3, name: "IBM", logo: IBM_logo },
  { id: 4, name: "Deloitte", logo: Deloitte_logo },
  { id: 5, name: "Bajaj", logo: Bajaj_logo },
  { id: 6, name: "Tejas Networks", logo: Tejas_logo }
];

function Placement() {
  return (
    <>
      <div className="main-placements bg-gray-50">
        {/* About Placement Section */}
        <AboutPlacement />

          {/* placement data analysis */}
        <StudentPlacementData/>



        {/* Industry Partnerships Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Industry Partnerships</h2>
            <p className="text-center text-gray-600 mb-8">We collaborate with leading tech companies for training, workshops, and cutting-edge curriculum development</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {industryPartners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-lg p-4 shadow-md flex items-center justify-center h-32 transform transition-transform hover:scale-110">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`} 
                    className="max-h-16 max-w-full object-contain" 
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <h3 className="text-xl font-semibold mb-4">Partnership Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Industry Workshops</h4>
                  <p className="text-gray-700">Regular workshops on emerging technologies conducted by industry experts</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Certification Programs</h4>
                  <p className="text-gray-700">Access to industry-recognized certification courses and materials</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Internship Opportunities</h4>
                  <p className="text-gray-700">Exclusive internship programs for our CS students with partner companies</p>
                </div>
              </div>
            </div>
          </div>
        </section>
         {/* CS Placement Process */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">CS Placement Process</h2>
            <p className="text-center text-gray-600 mb-8">Understanding our streamlined placement procedure</p>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600"></div>
                
                {/* Timeline items */}
                <div className="space-y-12">
  {/* Step 1 */}
  <div className="flex flex-col md:flex-row items-center">
    <div className="flex-1 md:text-right md:pr-8 text-center mb-4 md:mb-0 order-2 md:order-1">
      <h3 className="text-xl font-bold text-blue-700">Registration</h3>
      <p className="text-gray-600">Students register for placement process through the portal</p>
    </div>
    <div className="relative z-10 rounded-full h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold border-4 border-white shadow-lg order-1 md:order-2 mb-4 md:mb-0">
      1
    </div>
    <div className="flex-1 md:pl-8 hidden md:block order-3">
      {/* Empty div for layout balance on desktop */}
    </div>
  </div>
  
  {/* Step 2 */}
  <div className="flex flex-col md:flex-row items-center">
    <div className="hidden md:block flex-1 md:text-right md:pr-8 order-1">
      <h3 className="text-xl font-bold text-blue-700">Pre-Placement Training</h3>
      <p className="text-gray-600">Technical and soft skills preparation sessions</p>
    </div>
    <div className="relative z-10 rounded-full h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold border-4 border-white shadow-lg order-1 md:order-2 mb-4 md:mb-0">
      2
    </div>
    <div className="flex-1 md:pl-8 order-3 md:order-3">
      <div className="md:hidden text-center mb-4">
        <h3 className="text-xl font-bold text-blue-700">Pre-Placement Training</h3>
        <p className="text-gray-600">Technical and soft skills preparation sessions</p>
      </div>
    </div>
  </div>
  
  {/* Step 3 */}
  <div className="flex flex-col md:flex-row items-center">
    <div className="flex-1 md:text-right md:pr-8 text-center mb-4 md:mb-0 order-2 md:order-1">
      <h3 className="text-xl font-bold text-blue-700">Resume Screening</h3>
      <p className="text-gray-600">Companies shortlist candidates based on criteria</p>
    </div>
    <div className="relative z-10 rounded-full h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold border-4 border-white shadow-lg order-1 md:order-2 mb-4 md:mb-0">
      3
    </div>
    <div className="flex-1 md:pl-8 hidden md:block order-3">
      {/* Empty div for layout balance on desktop */}
    </div>
  </div>
  
  {/* Step 4 */}
  <div className="flex flex-col md:flex-row items-center">
    <div className="hidden md:block flex-1 md:text-right md:pr-8 order-1">
      <h3 className="text-xl font-bold text-blue-700">Selection Process</h3>
      <p className="text-gray-600">Technical tests, coding rounds, interviews</p>
    </div>
    <div className="relative z-10 rounded-full h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold border-4 border-white shadow-lg order-1 md:order-2 mb-4 md:mb-0">
      4
    </div>
    <div className="flex-1 md:pl-8 order-3 md:order-3">
      <div className="md:hidden text-center mb-4">
        <h3 className="text-xl font-bold text-blue-700">Selection Process</h3>
        <p className="text-gray-600">Technical tests, coding rounds, interviews</p>
      </div>
    </div>
  </div>
  
  {/* Step 5 */}
  <div className="flex flex-col md:flex-row items-center">
    <div className="flex-1 md:text-right md:pr-8 text-center mb-4 md:mb-0 order-2 md:order-1">
      <h3 className="text-xl font-bold text-blue-700">Job Offer</h3>
      <p className="text-gray-600">Selected students receive offer letters</p>
    </div>
    <div className="relative z-10 rounded-full h-12 w-12 flex items-center justify-center bg-blue-600 text-white font-bold border-4 border-white shadow-lg order-1 md:order-2 mb-4 md:mb-0">
      5
    </div>
    <div className="flex-1 md:pl-8 hidden md:block order-3">
      {/* Empty div for layout balance on desktop */}
    </div>
  </div>
</div>
              </div>
            </div>
          </div>
        </section>


         {/* CS Placement Statistics */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">CS Placement Statistics</h2>
            <p className="text-center text-gray-600 mb-8">Our Computer Science graduates are among the most sought-after talent in the industry</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {placementStats.map((stat) => (
                <div key={stat.id} className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                  <div className="flex flex-col items-center">
                    {stat.icon}
                    <h3 className="text-gray-700 font-bold mt-4">{stat.title}</h3>
                    <p className="text-3xl font-bold text-blue-700 mt-2">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        

        {/* Mentor List Section */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Training and Placement Mentors</h2>
            <p className="text-center text-gray-600 mb-8">Our dedicated team guiding students towards successful careers</p>
            
            <div className="table-responsive overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-blue-700 text-white uppercase text-sm leading-normal">
                  <tr>
                    <td className="py-4 px-6 text-left">S.No.</td>
                    <td className="py-4 px-6 text-left">Name</td>
                    <td className="py-4 px-6 text-left">Department</td>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="py-4 px-6 text-left">1</td>
                    <td className="py-4 px-6 text-left font-medium">Dr. Shikha Agrawal</td>
                    <td className="py-4 px-6 text-left">
                      Director, Training & Placement Associate Professor, CSE Department
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="py-4 px-6 text-left">2</td>
                    <td className="py-4 px-6 text-left font-medium">Prof. Rajeev Pandey</td>
                    <td className="py-4 px-6 text-left">Associate Professor, CSE Department</td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-blue-50">
                    <td className="py-4 px-6 text-left">3</td>
                    <td className="py-4 px-6 text-left font-medium">Mr. Santosh K Yadav</td>
                    <td className="py-4 px-6 text-left">Supporting Staff, Training & Placement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>



        {/* Top Recruiting Companies Carousel */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Top Recruiting Companies</h2>
            <p className="text-center text-gray-600 mb-8">Leading tech companies that regularly recruit our CS graduates</p>
            
            <div className="max-w-4xl mx-auto">
              <Carousel 
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
                autoPlay={true}
                interval={3000}
                centerMode={true}
                centerSlidePercentage={100}
              >
                {topCompanies.map((company) => (
                  <div key={company.id} className="bg-white rounded-lg shadow-lg p-6 m-2 h-72">
                    <div className="flex flex-col items-center mb-4">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        className="h-16 object-contain mb-4" 
                      />
                      <h3 className="text-xl font-bold text-gray-800">{company.name}</h3>
                      <p className="text-blue-600 font-semibold">Avg Package: {company.avgPackage}</p>
                    </div>
                    <div>
                      <h4 className="text-gray-700 font-semibold mb-2">Roles Offered:</h4>
                      <ul className="flex flex-wrap justify-center gap-2">
                        {company.roles.map((role, index) => (
                          <li key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
        
        </div>
      
    </>
  );
}

export default Placement;
