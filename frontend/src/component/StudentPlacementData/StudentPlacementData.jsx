import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  FaSearch, 
  FaSort, 
  FaSortUp, 
  FaSortDown, 
  FaFilter, 
  FaChartBar, 
  FaBuilding,
  FaRupeeSign 
} from "react-icons/fa";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const StudentPlacementData = () => {
  const api = import.meta.env.VITE_API_URL;
  const [placementData, setPlacementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("2025");
  const [sortConfig, setSortConfig] = useState({
    key: "package",
    direction: "descending"
  });
  const [viewMode, setViewMode] = useState("table"); // table, charts, companies
  
  // Fix: Safely handle availableYears computation with a check
  const availableYears = Array.isArray(placementData) 
    ? [...new Set(placementData.map(item => item.year))].sort((a, b) => b - a)
    : [];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${api}/placement`);
        
        // Fix: Ensure we're storing an array in placementData
        const dataArray = Array.isArray(response.data.result) 
          ? response.data.result
          : response.data.result || []; // Handle if data is nested in a 'data' property
        
        // console.log("API Response:", response.data);
        // console.log("Processed Data Array:", dataArray);
        
        setPlacementData(dataArray);
        setFilteredData(dataArray);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching placement data:", err);
        setError("Failed to load placement data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [api]);

  useEffect(() => {
    // Fix: Add safety check for placementData
    if (!Array.isArray(placementData) || placementData.length === 0) {
      setFilteredData([]);
      return;
    }
    
    let result = [...placementData];
    
    // Apply year filter
    if (yearFilter !== "all") {
      result = result.filter(item => item.year === parseInt(yearFilter));
    }
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => 
        item.stdName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredData(result);
  }, [searchTerm, yearFilter, sortConfig, placementData]);

  // The rest of your component remains the same...
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key === name) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort className="opacity-30" />;
  };

  // Calculate statistics with safety check
  const calculateStats = () => {
    if (!Array.isArray(filteredData) || filteredData.length === 0) 
      return { avg: 0, max: 0, totalPlacements: 0 };
    
    const packages = filteredData.map(item => item.package || 0);
    const avg = packages.reduce((acc, val) => acc + val, 0) / packages.length;
    const max = Math.max(...packages);
    
    return {
      avg: avg.toFixed(2),
      max: max,
      totalPlacements: filteredData.length
    };
  };
  
  const stats = calculateStats();

  // Safe prepare data for charts
  const prepareYearlyData = () => {
    if (!Array.isArray(filteredData) || filteredData.length === 0) return [];
    
    const yearlyStats = {};
    
    filteredData.forEach(item => {
      if (!item.year) return; // Skip items without year
      
      if (!yearlyStats[item.year]) {
        yearlyStats[item.year] = {
          placements: 0,
          totalPackage: 0,
          companies: new Set()
        };
      }
      
      yearlyStats[item.year].placements += 1;
      yearlyStats[item.year].totalPackage += (item.package || 0);
      if (item.companyName) yearlyStats[item.year].companies.add(item.companyName);
    });
    
    return Object.keys(yearlyStats).map(year => ({
      year: parseInt(year),
      placements: yearlyStats[year].placements,
      avgPackage: yearlyStats[year].placements > 0 ? 
        yearlyStats[year].totalPackage / yearlyStats[year].placements : 0,
      companies: yearlyStats[year].companies.size
    })).sort((a, b) => a.year - b.year);
  };
  
  const prepareCompanyData = () => {
    if (!Array.isArray(filteredData) || filteredData.length === 0) return [];
    
    const companyStats = {};
    
    filteredData.forEach(item => {
      if (!item.companyName) return; // Skip items without company name
      
      if (!companyStats[item.companyName]) {
        companyStats[item.companyName] = {
          placements: 0,
          totalPackage: 0
        };
      }
      
      companyStats[item.companyName].placements += 1;
      companyStats[item.companyName].totalPackage += (item.package || 0);
    });
    
    return Object.keys(companyStats)
      .map(company => ({
        name: company,
        value: companyStats[company].placements,
        avgPackage: companyStats[company].placements > 0 ?
          (companyStats[company].totalPackage / companyStats[company].placements).toFixed(2) : "0.00"
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 7); // Top 7 companies
  };
  
  const yearlyData = prepareYearlyData();
  const companyData = prepareCompanyData();

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="bg-red-100 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!Array.isArray(placementData) || placementData.length === 0) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <div className="bg-blue-100 p-6 rounded-md text-center">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">No Placement Data Available</h3>
          <p className="text-gray-700 mb-4">There are currently no placement records to display.</p>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Your existing JSX remains unchanged */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h2 className="text-2xl font-bold">Student Placement Records</h2>
        <p className="opacity-80">Explore our students' placement journey and achievements</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-700 text-sm font-medium">Total Placements</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalPlacements}</h3>
            </div>
            <div className="bg-blue-600 h-12 w-12 rounded-full flex items-center justify-center text-white">
              <FaChartBar size={20} />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-700 text-sm font-medium">Average Package</p>
              <h3 className="text-2xl font-bold text-gray-800">
                <span className="flex items-center"><FaRupeeSign size={18} /> {stats.avg} LPA</span>
              </h3>
            </div>
            <div className="bg-green-600 h-12 w-12 rounded-full flex items-center justify-center text-white">
              <FaRupeeSign size={20} />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg shadow"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-amber-700 text-sm font-medium">Highest Package</p>
              <h3 className="text-2xl font-bold text-gray-800">
                <span className="flex items-center"><FaRupeeSign size={18} /> {stats.max} LPA</span>
              </h3>
            </div>
            <div className="bg-amber-500 h-12 w-12 rounded-full flex items-center justify-center text-white">
              <FaRupeeSign size={20} />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Rest of your component... */}
      {/* Filters and View Controls */}
      <div className="border-b border-gray-200 pb-4">
        <div className="px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by student name or company..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex-shrink-0 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="all">All Years</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode("table")} 
              className={`px-4 py-2 rounded-md ${viewMode === "table" ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Table
            </button>
            <button 
              onClick={() => setViewMode("charts")} 
              className={`px-4 py-2 rounded-md ${viewMode === "charts" ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Charts
            </button>
            <button 
              onClick={() => setViewMode("companies")} 
              className={`px-4 py-2 rounded-md ${viewMode === "companies" ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Companies
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {viewMode === "table" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => requestSort('stdName')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Student Name</span>
                      {getSortIcon('stdName')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => requestSort('companyName')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Company</span>
                      {getSortIcon('companyName')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => requestSort('package')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Package (LPA)</span>
                      {getSortIcon('package')}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-200"
                    onClick={() => requestSort('year')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Year</span>
                      {getSortIcon('year')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.stdName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.companyName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="flex items-center">
                          <FaRupeeSign className="text-green-600 mr-1" />
                          {item.package}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.year}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 whitespace-nowrap text-sm text-gray-500 text-center">
                      No placement records found with the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        

{viewMode === "charts" && (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Yearly Placement Statistics</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={yearlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'avgPackage') return [`₹${value.toFixed(2)} LPA`, 'Avg. Package'];
                return [value, name === 'placements' ? 'Students Placed' : 'Companies'];
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="placements" name="Students Placed" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="avgPackage" name="Avg. Package (LPA)" fill="#82ca9d" />
            <Bar yAxisId="left" dataKey="companies" name="Companies" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Package Distribution</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-gray-700 font-medium mb-2 text-center">Package Ranges</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {range: '< 5 LPA', value: filteredData.filter(i => i.package < 5).length},
                  {range: '5-10 LPA', value: filteredData.filter(i => i.package >= 5 && i.package < 10).length},
                  {range: '10-15 LPA', value: filteredData.filter(i => i.package >= 10 && i.package < 15).length},
                  {range: '15-20 LPA', value: filteredData.filter(i => i.package >= 15 && i.package < 20).length},
                  {range: '20+ LPA', value: filteredData.filter(i => i.package >= 20).length},
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} students`, 'Count']} />
                <Bar dataKey="value" fill="#8884d8">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-gray-700 font-medium mb-2 text-center">Top Packages</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredData
                  .sort((a, b) => b.package - a.package)
                  .slice(0, 5)
                  .map(item => ({
                    name: item.stdName,
                    package: item.package,
                    company: item.companyName
                  }))
                }
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip 
                  formatter={(value, name) => [`₹${value} LPA`, name]}
                  labelFormatter={(label) => `Student: ${label}`}
                  content={(props) => {
                    const { payload } = props;
                    if (payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border border-gray-300 rounded shadow-sm">
                          <p className="font-medium">{payload[0].payload.name}</p>
                          <p className="text-sm">{payload[0].payload.company}</p>
                          <p className="text-sm font-medium text-green-700">₹{payload[0].payload.package} LPA</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="package" fill="#82ca9d" name="Package (LPA)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{viewMode === "companies" && (
  <div className="space-y-8">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Recruiting Companies</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={companyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={(entry) => entry.name}
              >
                {companyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [`${value} students`, props.payload.name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-gray-800 font-medium mb-4">Top Companies by Placements</h4>
          <div className="space-y-4">
            {companyData.map((company, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="h-3 w-3 rounded-full mr-3" 
                  style={{backgroundColor: COLORS[index % COLORS.length]}}
                ></div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">{company.name}</span>
                    <span className="text-gray-600">{company.value} placements</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Average Package</span>
                    <span className="text-green-700 font-medium">₹{company.avgPackage} LPA</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full" 
                      style={{
                        width: `${(company.value / Math.max(...companyData.map(c => c.value))) * 100}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Companies by Average Package</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={companyData.sort((a, b) => b.avgPackage - a.avgPackage)}
            margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end"
              height={70}
              interval={0}
            />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`₹${value} LPA`, 'Average Package']}
            />
            <Legend />
            <Bar dataKey="avgPackage" name="Average Package (LPA)" fill="#82ca9d">
              {companyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
    
    <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">Industry Insights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-100 mb-3">
            <FaBuilding className="text-blue-700" />
          </div>
          <h4 className="font-medium text-gray-800">Top Recruiter</h4>
          <p className="text-blue-700 font-bold">
            {companyData.length > 0 ? companyData[0].name : 'N/A'}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-100 mb-3">
            <FaRupeeSign className="text-green-700" />
          </div>
          <h4 className="font-medium text-gray-800">Highest Avg. Package</h4>
          <p className="text-green-700 font-bold">
            {companyData.length > 0 ? `₹${Math.max(...companyData.map(c => parseFloat(c.avgPackage))).toFixed(2)} LPA` : 'N/A'}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-purple-100 mb-3">
            <FaChartBar className="text-purple-700" />
          </div>
          <h4 className="font-medium text-gray-800">Industry Diversity</h4>
          <p className="text-purple-700 font-bold">
            {companyData.length} Companies
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center justify-center h-10 w-10 rounded-md bg-amber-100 mb-3">
            <FaChartBar className="text-amber-700" />
          </div>
          <h4 className="font-medium text-gray-800">Current Trend</h4>
          <p className="text-amber-700 font-bold">
            {companyData.length > 0 ? 
              companyData.slice(0, 3).map(c => c.name.split(' ')[0]).join(', ') : 
              'N/A'}
          </p>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>
          These analytics provide insights into company recruitment patterns and help identify industry trends
          for strategic placement preparation.
        </p>
      </div>
    </div>
  </div>
)}
      </div>
    </motion.div>
  );
};

export default StudentPlacementData;