import React from "react";
const HodMessage = () => {
  return (
    <>
    <section className="bg-gray-100 py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden p-6 md:flex md:items-center">
        
        <div className="md:w-2/3 md:pr-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Message from the Head of Department CSE
          </h2>
          
          <p className="text-gray-600 leading-relaxed text-justify">
            CSE department is an department with unconditional commitment and total dedication for the cause of 
            development of technical education in the country. This institution is one of the leading 
            institutes of Central India that aims at producing competent engineers who can contribute to 
            bringing this nation to a greater height.
          </p>
          <p className="text-gray-600 leading-relaxed mt-2 text-justify">
            Through this portal of UIT-Cse dept, I call upon all stakeholders to help this Institute achieve this goal. 
            I hope that my Dear students will extend their full support in maintaining discipline & decorum in the 
            Institution and will refrain from mass absenteeism & ragging. With your support, I am sure we will 
            very soon convert this cse department into a world-class Academic Institution of Excellence.
          </p>
          <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-red-700 transition">
            <span className="mr-2">&#8594;</span> Read More
          </button>
        </div>
        <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center  ">
          <div className="text-center">
            <img
              src="https://www.uitrgpv.ac.in/AboutDepartment/FacultyImages/MA_080321113310.jpg" // Update with the actual image path
              alt="Dr. Manish Kumar Ahirwar"
              width={200}
              height={200}
              className="rounded-full shadow-lg border-4 border-white"
            />
            <div className="mt-3 bg-orange-500 text-white py-2 px-4 rounded-lg">
              <p className="text-lg font-semibold">DR. Manish Kumar Ahirwar</p>
              <p className="text-sm">Head of dept.CSE</p>
            </div>
          </div>
        </div>
      </div>
    </section></>
  );
};

export default HodMessage;