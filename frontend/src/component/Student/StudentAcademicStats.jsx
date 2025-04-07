import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { FiUsers, FiAward, FiTrendingUp, FiAlertTriangle, FiBarChart2, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

const StudentAcademicStats = () => {

  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const [studentData, setStudentData] = useState({
    cgpaDistribution: null,
    semesterTrends: null,
    yearStats: null,
    detentionRate: null,
    loading: true,
    error: null
  });
  
  const [filters, setFilters] = useState({
    year: new Date().getFullYear(),
    showDetained: true
  });
  const currentYear = new Date().getFullYear();
  const [students, setStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [selectedYear, setSelectedYear] = useState(currentYear-4);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableYears, setAvailableYears] = useState([currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4]);
  // Add these pagination state variables


const [currentPage, setCurrentPage] = useState(1);
const pageSize = 12; // Number of students per page


  // Fetch actual data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStudentData(prev => ({...prev, loading: true}));
        
        // Fetch all students
        const studentsResponse = await axios.get(`${api}/trData`);
        const studentsData = studentsResponse.data;
        
        // Fetch year-specific count
        const countResponse = await axios.get(`${api}/trData/count/${selectedYear}`);
        const yearCount = countResponse.data?.totalStudents || 0;
        
        // console.log("Students data fetched:", studentsData.length, "records");
        // console.log("Year count for", selectedYear, ":", yearCount);
        
        // Extract available years from data for the dropdown
        const yearsSet = new Set(studentsData.map(student => student.year));
        if (yearsSet.size > 0) {
          setAvailableYears(Array.from(yearsSet).sort());
        }
        
        // Filter students for the selected year
        const yearFilteredStudents = studentsData.filter(
          student => student.year === selectedYear
        );
        
        setStudents(yearFilteredStudents);
        setTotalStudents(yearCount);
        
        // Process data for visualizations
        processStudentData(studentsData);
      } catch (error) {
        console.error("Failed to fetch academic stats:", error);
        setStudentData(prev => ({
          ...prev,
          loading: false,
          error: "Failed to load academic statistics. Please try again later."
        }));
        
        // Fallback to sample data for development/testing
        useSampleData();
      }
    };

    fetchData();
  }, [selectedYear]);


  // Add this effect
useEffect(() => {
  setCurrentPage(1);
}, [searchTerm]);
  
  // Fallback function to use sample data if API fails
  const useSampleData = () => {
    console.warn("Using sample data as fallback");
    
    const sampleStudentsData = [
      {
        enrollNo: "CSE001",
        year: 2017,
        sem_1: 8.5,
        sem_2: 8.7,
        sem_3: 9.0,
        sem_4: 8.8,
        sem_5: 9.2,
        sem_6: 8.9,
        sem_7: 9.1, 
        sem_8: 9.3,
        detend: false
      },
      {
        enrollNo: "CSE002",
        year: 2017,
        sem_1: 7.5,
        sem_2: 7.2,
        sem_3: 7.8,
        sem_4: 7.6,
        sem_5: 7.9,
        sem_6: 8.0,
        sem_7: 8.2,
        sem_8: 8.3,
        detend: false
      },
      {
        enrollNo: "CSE003",
        year: 2017,
        sem_1: 6.5,
        sem_2: 6.8,
        sem_3: 6.2,
        sem_4: 6.0,
        sem_5: 5.8,
        sem_6: 6.1,
        sem_7: 6.4,
        sem_8: 6.3,
        detend: true
      },
      {
        enrollNo: "CSE004",
        year: 2021,
        sem_1: 9.2,
        sem_2: 9.1,
        sem_3: 9.4,
        sem_4: 9.5,
        sem_5: 9.3,
        sem_6: 9.6,
        sem_7: 9.7,
        sem_8: 9.8,
        detend: false
      },
      {
        enrollNo: "CSE005",
        year: 2021,
        sem_1: 8.0,
        sem_2: 8.2,
        sem_3: 8.1,
        sem_4: 8.3,
        sem_5: 8.4,
        sem_6: 8.5,
        sem_7: 8.6,
        sem_8: 8.7,
        detend: true
      }
      // Other sample records as in your original code
    ];
    
    // Sample year count data
    const sampleYearCount = 45;
    
    // Set state with sample data
    setStudents(sampleStudentsData.filter(s => s.year === selectedYear));
    setTotalStudents(sampleYearCount);
    
    // Process data for visualizations
    processStudentData(sampleStudentsData);
  };

  // Process and analyze data for visualizations
  const processStudentData = (studentsData) => {
    // Filter students by selected year if needed
    const yearFilteredStudents = studentsData.filter(student => 
      student.year === selectedYear
    );
    
    // Calculate CGPA distribution
    const cgpaRanges = {
      '9-10': 0,
      '8-9': 0,
      '7-8': 0,
      '6-7': 0,
      'Below 6': 0
    };
    
    yearFilteredStudents.forEach(student => {
      // Calculate average CGPA across semesters
      const semValues = [
        student.sem_1 || 0, 
        student.sem_2 || 0, 
        student.sem_3 || 0, 
        student.sem_4 || 0,
        student.sem_5 || 0, 
        student.sem_6 || 0, 
        student.sem_7 || 0, 
        student.sem_8 || 0
      ].filter(val => val > 0); // Only consider non-zero values
      
      const avgCgpa = semValues.length ? 
        semValues.reduce((a, b) => a + b, 0) / semValues.length : 0;
      
      // Categorize by CGPA range
      if (avgCgpa >= 9) cgpaRanges['9-10']++;
      else if (avgCgpa >= 8) cgpaRanges['8-9']++;
      else if (avgCgpa >= 7) cgpaRanges['7-8']++;
      else if (avgCgpa >= 6) cgpaRanges['6-7']++;
      else cgpaRanges['Below 6']++;
    });
    
    // Get semester trends (average CGPA per semester)
    const semesterAverages = [1, 2, 3, 4, 5, 6, 7, 8].map(semNum => {
      const semField = `sem_${semNum}`;
      const validScores = yearFilteredStudents
        .map(student => student[semField] || 0)
        .filter(score => score > 0);
      
      return validScores.length ? 
        validScores.reduce((a, b) => a + b, 0) / validScores.length : 0;
    });
    
    // Calculate detention rate
    const detainedCount = yearFilteredStudents.filter(s => s.detend).length;
    const detentionRate = yearFilteredStudents.length > 0 ? 
      (detainedCount / yearFilteredStudents.length) * 100 : 0;
    
    // Year-wise statistics
    // Get unique years from data
    const uniqueYears = [...new Set(studentsData.map(s => s.year))].sort();
    
    // If not enough unique years, add some reasonable defaults
    if (uniqueYears.length < 5) {
      const currentYear = new Date().getFullYear()-1;
      for (let i = 0; i < 5; i++) {
        if (!uniqueYears.includes(currentYear - i)) {
          uniqueYears.push(currentYear - i);
        }
      }
      uniqueYears.sort();
    }
    
    // Get the 6 most recent years
    const yearLabels = uniqueYears.slice(-6);
    
    const yearData = yearLabels.map(year => {
      const yearStudents = studentsData.filter(s => s.year === year);
      return {
        year,
        count: yearStudents.length,
        avgCgpa: yearStudents.length ? calculateAvgCgpa(yearStudents) : 0,
        detentionRate: yearStudents.length ? 
          (yearStudents.filter(s => s.detend).length / yearStudents.length) * 100 : 0
      };
    });
    
    // Prepare chart data objects
    const cgpaDistribution = {
      labels: Object.keys(cgpaRanges),
      datasets: [
        {
          label: 'Students',
          data: Object.values(cgpaRanges),
          backgroundColor: [
            'rgba(129, 140, 248, 0.8)',  // Indigo
            'rgba(52, 211, 153, 0.8)',   // Emerald
            'rgba(251, 146, 60, 0.8)',   // Orange
            'rgba(251, 191, 36, 0.8)',   // Amber
            'rgba(239, 68, 68, 0.8)',    // Red
          ],
          borderColor: [
            'rgba(129, 140, 248, 1)',
            'rgba(52, 211, 153, 1)',
            'rgba(251, 146, 60, 1)',
            'rgba(251, 191, 36, 1)',
            'rgba(239, 68, 68, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    const semesterTrends = {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
      datasets: [
        {
          label: 'Average CGPA',
          data: semesterAverages,
          borderColor: 'rgba(79, 70, 229, 1)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgba(79, 70, 229, 1)',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
    
    const yearStats = {
      labels: yearData.map(d => d.year),
      datasets: [
        {
          type: 'bar',
          label: 'Student Count',
          data: yearData.map(d => d.count),
          backgroundColor: 'rgba(129, 140, 248, 0.6)',
          borderColor: 'rgba(129, 140, 248, 1)',
          borderWidth: 1,
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: 'Avg CGPA',
          data: yearData.map(d => d.avgCgpa),
          borderColor: 'rgba(52, 211, 153, 1)',
          backgroundColor: 'rgba(52, 211, 153, 0.1)',
          pointBackgroundColor: 'rgba(52, 211, 153, 1)',
          tension: 0.4,
          yAxisID: 'y1',
        }
      ],
    };
    
    const detentionRateData = {
      labels: ['Detained', 'Good Standing'],
      datasets: [
        {
          data: [detentionRate, 100 - detentionRate],
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)',
            'rgba(52, 211, 153, 0.8)',
          ],
          borderColor: [
            'rgba(239, 68, 68, 1)',
            'rgba(52, 211, 153, 1)',
          ],
          borderWidth: 1,
          hoverOffset: 4,
        },
      ],
    };

  
   

    setStudentData({
      cgpaDistribution,
      semesterTrends,
      yearStats,
      detentionRate: detentionRateData,
      loading: false,
      error: null
    });
  };
  
  // Helper function to calculate average CGPA
  const calculateAvgCgpa = (students) => {
    let totalCgpa = 0;
    let validCount = 0;
    
    students.forEach(student => {
      const semValues = [
        student.sem_1 || 0, 
        student.sem_2 || 0, 
        student.sem_3 || 0, 
        student.sem_4 || 0,
        student.sem_5 || 0, 
        student.sem_6 || 0, 
        student.sem_7 || 0, 
        student.sem_8 || 0
      ].filter(val => val > 0);
      
      if (semValues.length) {
        totalCgpa += semValues.reduce((a, b) => a + b, 0) / semValues.length;
        validCount++;
      }
    });
    
    return validCount ? totalCgpa / validCount : 0;
  };
  
  // Get summary statistics
  const getAverageCGPA = () => {
    if (!students.length) return "0.0";
    
    const yearFiltered = students.filter(s => s.year === selectedYear);
    return calculateAvgCgpa(yearFiltered).toFixed(1);
  };
  
  const getDetentionPercentage = () => {
    if (!students.length) return "0";
    
    const yearFiltered = students.filter(s => s.year === selectedYear);
    if (!yearFiltered.length) return "0";
    
    const detainedCount = yearFiltered.filter(s => s.detend).length;
    return Math.round((detainedCount / yearFiltered.length) * 100);
  };
  
  // Filter visible students by search term
  // Filter visible students by search term and handle pagination
const filteredStudents = students
.filter(student => 
  student.enrollNo.toLowerCase().includes(searchTerm.toLowerCase())
);

// Get current page slice of students
const paginatedStudents = filteredStudents
.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (studentData.loading) {
    return (
      <div className="backdrop-blur-sm bg-white/80 rounded-xl p-6 shadow-lg border border-indigo-100 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-40 bg-gray-200 rounded mb-4"></div>
        <div className="h-40 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
      </div>
    );
  }

  if (studentData.error) {
    return (
      <div className="backdrop-blur-sm bg-white/80 rounded-xl p-6 shadow-lg border border-red-100">
        <h3 className="text-xl font-bold text-red-600 mb-2">Error Loading Data</h3>
        <p className="text-gray-600">{studentData.error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    { 
      id: 1, 
      title: "Total Students", 
      value: totalStudents.toString(), 
      icon: <FiUsers size={20} />,
      background: "from-indigo-100 to-indigo-50",
      textColor: "text-indigo-800",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      border: "border-indigo-200"
    },
    { 
      id: 2, 
      title: "Average CGPA", 
      value: getAverageCGPA(), 
      icon: <FiAward size={20} />,
      background: "from-emerald-100 to-emerald-50",
      textColor: "text-emerald-800",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      border: "border-emerald-200"
    },
    { 
      id: 3, 
      title: "Detention Rate", 
      value: getDetentionPercentage() + "%", 
      icon: <FiAlertTriangle size={20} />,
      background: "from-amber-100 to-amber-50",
      textColor: "text-amber-800",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600", 
      border: "border-amber-200"
    }
    
  ];

  return (
    <div className="space-y-6">
      {/* Header with year selector */}
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-600"
        >
          Academic Analytics Dashboard
        </motion.h2>
        
        <div className="flex space-x-2">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {statCards.map((card, index) => (
          <motion.div 
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-5 rounded-xl bg-gradient-to-br ${card.background} ${card.border} border shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-center">
              <div className={`p-3 ${card.iconBg} rounded-lg mr-4 ${card.iconColor}`}>
                {card.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Content - 2 columns on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CGPA Distribution */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-sm bg-white/90 rounded-xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-indigo-900">CGPA Distribution</h3>
            <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">
              <FiBarChart2 size={18} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-2">
            <div className="h-[250px] flex justify-center">
              <Pie 
                data={studentData.cgpaDistribution} 
                options={{ 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                          size: 11
                        }
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw || 0;
                          const total = context.dataset.data.reduce((a, b) => a + b, 0);
                          const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                          return `${label}: ${value} students (${percentage}%)`;
                        }
                      }
                    }
                  }
                }} 
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 italic">Distribution of students across CGPA ranges for {selectedYear}</p>
        </motion.div>

        {/* Semester Trends */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-sm bg-white/90 rounded-xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-indigo-900">Semester Performance Trends</h3>
            <div className="text-emerald-600 bg-emerald-50 p-2 rounded-lg">
              <FiTrendingUp size={18} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-2">
            <div className="h-[250px]">
              <Line 
                data={studentData.semesterTrends}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: false,
                      min: Math.max(0, Math.min(...studentData.semesterTrends.datasets[0].data.filter(v => v > 0)) - 1 || 0),
                      max: 10,
                      ticks: {
                        stepSize: 1
                      },
                      grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                      }
                    },
                    x: {
                      grid: {
                        display: false
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    },
                    tooltip: {
                      backgroundColor: 'rgba(79, 70, 229, 0.9)',
                      titleFont: {
                        size: 13
                      },
                      bodyFont: {
                        size: 12
                      },
                      padding: 10,
                      cornerRadius: 6
                    }
                  },
                  interaction: {
                    intersect: false,
                    mode: 'index'
                  }
                }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 italic">Average CGPA trends across semesters for {selectedYear}</p>
        </motion.div>

        {/* Year-wise Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-sm bg-white/90 rounded-xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-indigo-900">Year-wise Statistics</h3>
            <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">
              <FiBarChart2 size={18} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-2">
            <div className="h-[250px]">
              <Bar 
                data={studentData.yearStats}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      type: 'linear',
                      display: true,
                      position: 'left',
                      title: {
                        display: true,
                        text: 'Student Count',
                        font: {
                          size: 11
                        }
                      }
                    },
                    y1: {
                      type: 'linear',
                      display: true,
                      position: 'right',
                      min: 0,
                      max: 10,
                      grid: {
                        drawOnChartArea: false
                      },
                      title: {
                        display: true,
                        text: 'CGPA',
                        font: {
                          size: 11
                        }
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        boxWidth: 12,
                        font: {
                          size: 11
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 italic">Comparison of student count and performance across years</p>
        </motion.div>

        {/* Detention Rate */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-sm bg-white/90 rounded-xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-indigo-900">Detention Status</h3>
            <div className="text-amber-600 bg-amber-50 p-2 rounded-lg">
              <FiAlertTriangle size={18} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-2">
            <div className="h-[250px] flex justify-center items-center">
              <div className="w-3/4">
                <Doughnut
                  data={studentData.detentionRate}
                  options={{
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          boxWidth: 12,
                          padding: 15,
                          font: {
                            size: 11
                          }
                        }
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = Math.round(context.raw * 10) / 10;
                            return `${label}: ${value}%`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 italic">Percentage of students with detention status in {selectedYear}</p>
        </motion.div>
      </div>

    

      {/* Student Data Preview Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="backdrop-blur-sm bg-white/90 rounded-xl p-6 shadow-lg border border-indigo-100 hover:shadow-xl transition-shadow"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-indigo-900">Student Data Preview</h3>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <div className="flex space-x-2 mr-4">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
              </div>
              <div className="relative ">

              

                <input
                  type="text"
                  placeholder="Search by Enrollment No."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />
                <FiSearch className="absolute left-2.5 top-2.5 text-gray-400" />
              </div>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-center text-md font-semibold text-gray-600">Enrollment No.</th>
                <th className="px-4 py-2 text-center text-md font-semibold text-gray-600">Name</th>
                <th className="px-4 py-2 text-center text-md font-semibold text-gray-600">Year</th>
                <th className="px-4 py-2 text-center text-md font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="11" className="px-4 py-4 text-center text-gray-500">
                    No students found matching your criteria
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student, index) => (
                  <tr key={`${student.enrollNo}-${index}`} 
                      className={student.detend ? "bg-red-50" : "bg-white hover:bg-gray-50"}>
                    <td className="px-4 py-2 text-sm text-gray-700 font-medium">{student.enrollNo}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{student.name}</td>
                    <td className={`px-4 py-2 text-gray-600 text-sm }`}>{student.year}</td>
                    
                    
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${student.detend 
                          ? "bg-red-100 text-red-800" 
                          : "bg-green-100 text-green-800"}`}
                      >
                        {student.detend ? "Detained" : "Good Standing"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
        <span>Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredStudents.length)} of {filteredStudents.length} students</span>
          <div>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`text-indigo-600 hover:text-indigo-800 font-medium mr-4 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Prev
            </button>
            <button 
              onClick={() => setCurrentPage(prev => (prev * pageSize < students.length) ? prev + 1 : prev)}
              disabled={currentPage * pageSize >= students.length}
              className={`text-indigo-600 hover:text-indigo-800 font-medium mr-2 ${currentPage * pageSize >= students.length ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Next
            </button>
         </div>
            
        </div>
      </motion.div>
    </div>
  );
};

// Helper function to determine text color based on CGPA
const getCgpaTextColor = (cgpa) => {
  if (!cgpa) return "text-gray-400";
  if (cgpa >= 8.5) return "text-emerald-600 font-semibold";
  if (cgpa >= 7.5) return "text-green-600";
  if (cgpa >= 6.5) return "text-blue-600";
  if (cgpa >= 5.5) return "text-amber-600";
  return "text-red-600";
};

export default StudentAcademicStats;