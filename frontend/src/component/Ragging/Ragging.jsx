import React from "react";
import { FaFileAlt, FaExclamationTriangle, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Ragging() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen pb-12">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-indigo-800 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}></div>
        <div className="container mx-auto px-6 relative h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              <span className="border-b-4 border-yellow-400 pb-1">ANTI-RAGGING INITIATIVE</span>
            </h1>
            <p className="text-white text-lg md:text-xl mt-4 max-w-2xl opacity-90">
              Computer Science & Engineering Department, UIT-RGPV
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        {/* Pledge Card */}
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 mb-8 border-l-4 border-red-500 transform hover:scale-[1.01] transition-transform">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="bg-red-100 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
              <FaExclamationTriangle className="text-red-600 text-3xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Important Instructions for CSE Students</h2>
          </div>
          
          <div className="prose max-w-none text-gray-600 leading-relaxed">
            <p className="mb-4">
              All students of the Computer Science & Engineering Department at UIT-RGPV are hereby informed that 
              ragging in any form is a <span className="font-semibold text-red-600">punishable crime</span> under UGC/AICTE regulations. 
              The department maintains a <span className="font-semibold">zero tolerance policy</span> regarding ragging.
            </p>
            
            <p>
              Strict disciplinary actions will be initiated against any student found engaged in ragging, 
              which may include filing of police cases and rustication from the university. Both parents and students 
              must submit a mandatory anti-ragging affidavit (available in the resources section below).
            </p>
            
            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="font-medium text-yellow-800">
                Don't hesitate to report ragging incidents. Your identity will be kept strictly confidential.
              </p>
            </div>
          </div>
        </div>
        
        {/* Resources & Contacts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Important Circulars */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow lg:col-span-2">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center">
                <FaFileAlt className="text-2xl mr-3 text-blue-100" />
                <h2 className="text-xl font-semibold">Important Circulars & Resources</h2>
              </div>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Undertaking Regarding Rules",
                    url: "https://www.uitrgpv.ac.in/pdf/underform_for_ragging.pdf",
                    tag: "Required"
                  },
                  {
                    title: "Affidavit of AICTE",
                    url: "https://www.uitrgpv.ac.in/pdf/Affidavit%20of%20AICTE%20regarding%20Anti%20Ragging.pdf",
                    tag: "Required"
                  },
                  {
                    title: "AICTE Notification",
                    url: "https://www.uitrgpv.ac.in/pdf/AICTE%20Notification%20Regarding%20Antiragging.pdf",
                    tag: "Important"
                  },
                  {
                    title: "Circular 01",
                    url: "https://www.uitrgpv.ac.in/pdf/C01.pdf"
                  },
                  {
                    title: "Circular 02",
                    url: "https://www.uitrgpv.ac.in/pdf/C02.pdf"
                  },
                  {
                    title: "Circular 03",
                    url: "https://www.uitrgpv.ac.in/pdf/C03.pdf"
                  },
                  {
                    title: "General Ragging Guidelines",
                    url: "https://www.uitrgpv.ac.in/pdf/ragging.pdf"
                  },
                  {
                    title: "In Case of Ragging",
                    url: "https://www.uitrgpv.ac.in/PDF/InCaseofRagging.pdf",
                    tag: "Emergency"
                  }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors group"
                  >
                    <div className="bg-blue-100 group-hover:bg-blue-200 rounded-full p-2 mr-3 transition-colors">
                      <FaFileAlt className="text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 group-hover:text-blue-700 transition-colors">{item.title}</span>
                      {item.tag && (
                        <span className={`ml-2 text-xs px-2 py-1 rounded ${
                          item.tag === "Required" ? "bg-red-100 text-red-700" : 
                          item.tag === "Important" ? "bg-blue-100 text-blue-700" : 
                          "bg-yellow-100 text-yellow-700"
                        }`}>{item.tag}</span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center">
                <FaPhoneAlt className="text-xl mr-3 text-indigo-100" />
                <h2 className="text-xl font-semibold">Report Ragging Incidents</h2>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-gray-600 mb-4">
                In case of any ragging incident or information, contact:
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    name: "Prof. S.S Bhadoriya",
                    position: "Director, UIT-RGPV",
                    contact: "uit_director@rgtu.net",
                    isEmail: true
                  },
                  {
                    name: "Dr. Anil Goyal",
                    position: "Proctor",
                    contact: "9425338282",
                    isEmail: false
                  },
                  {
                    name: "Prof. Manju Singh",
                    position: "DSW, RGPV",
                    contact: "0755-2678870",
                    contactAlt: "dsw@rgtu.net",
                    isEmail: false,
                    isEmailAlt: true
                  },
                  {
                    name: "Anti-Ragging Helpline",
                    contact: "1800-180-5522",
                    isEmail: false,
                    highlight: true
                  }
                ].map((contact, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${
                      contact.highlight 
                        ? 'bg-indigo-50 border-indigo-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                    {contact.position && <p className="text-sm text-gray-500">{contact.position}</p>}
                    <div className="mt-2 flex items-center">
                      {contact.isEmail ? (
                        <FaEnvelope className="text-indigo-500 mr-2" />
                      ) : (
                        <FaPhoneAlt className="text-indigo-500 mr-2" />
                      )}
                      <span className={contact.highlight ? "font-medium text-indigo-700" : "text-gray-700"}>
                        {contact.contact}
                      </span>
                    </div>
                    {contact.contactAlt && (
                      <div className="mt-1 flex items-center">
                        {contact.isEmailAlt ? (
                          <FaEnvelope className="text-indigo-500 mr-2" />
                        ) : (
                          <FaPhoneAlt className="text-indigo-500 mr-2" />
                        )}
                        <span className="text-gray-700">{contact.contactAlt}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>      
      </div>
    </div>
  );
}

export default Ragging;