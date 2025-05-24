import React from 'react';
import StudentHero from '../../component/Student/StudentHero';
import StudentStats from '../../component/Student/StudentStats';
import StudentLife from '../../component/Student/StudentLife';
import StudentAchievements from '../../component/Student/StudentAcheivements';
import StudentAcademicStats from '../../component/Student/StudentAcademicStats';
import StudentAcademicMaterials from '../../component/Student/StudentAcademicMaterials';
import StudentFAQ from '../../component/Student/StudentFAQ';
import Ragging from '../../component/Ragging/Ragging';



  
const Student = () => {
  return (
        <div className="font-['Poppins',sans-serif] pb-12">
          {/* Student Page Hero Section */}
          <StudentHero />
          
          {/* Key Statistics */}
          <StudentStats />
          
          {/* Main Content Section */}

          <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-8">
              {/* Main Content - 2/3 width on desktop */}
                <div className="lg:col-span-2 col-span-3 space-y-12">
                    <StudentLife />
                    <div className="mt-12">
                  <StudentAcademicMaterials />
                </div>
              </div> 
            </div>

    
          {/* Student Acheivement section */}

          <StudentAchievements />

          {/* Student Academic Statistics section */}
          <div className="lg:col-span-3 space-y-12 mt-10">
              <StudentAcademicStats />
          </div>
        </div>

            {/* Ragging Section */}
            <Ragging/>

            {/* FAQ Section */}
            <div className="container mx-auto px-4 py-10">
              <StudentFAQ />
            </div>
        </div>
  );
};

export default Student;