import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStudentDashboardStats, getDashboardStats } from '../../services/api';
import { BookOpen, MonitorPlay, XCircle, GraduationCap, Mail, Moon, Sun, Cloud, Download, Search, ChevronDown, Users } from 'lucide-react';

const TopCard = ({ title, action, icon: Icon, bgClass = "bg-white", textClass = "text-gray-900", iconColor = "text-blue-500", iconBg = "bg-blue-50" }) => (
    <div className={`${bgClass} rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow`}>
        <div>
            <h3 className={`text-base font-bold mb-1 ${textClass}`}>{title}</h3>
            <p className={`text-xs font-semibold ${bgClass === 'bg-[#0f4c5c]' ? 'text-white/80' : 'text-gray-500'}`}>{action}</p>
        </div>
        <div className={`h-12 w-12 rounded-xl ${iconBg} flex items-center justify-center`}>
            <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={1.5} />
        </div>
    </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [studentStats, setStudentStats] = useState(null);
  const [adminStats, setAdminStats] = useState(null);
  const [weather, setWeather] = useState({ temp: 30, desc: 'clear sky', icon: Moon });

  useEffect(() => {
      const fetchStats = async () => {
          try {
              if (user?.role === 'student') {
                const data = await getStudentDashboardStats();
                setStudentStats(data);
              } else {
                const data = await getDashboardStats();
                setAdminStats(data);
              }
          } catch (error) {
              console.error("Failed to fetch dashboard stats", error);
          }
      };
      
      const fetchWeather = async () => {
          try {
              // Institutional coordinates
              const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true'); // New Delhi default
              const data = await res.json();
              if (data && data.current_weather) {
                  const temp = Math.round(data.current_weather.temperature);
                  const code = data.current_weather.weathercode;
                  let desc = 'clear sky';
                  let WeatherIcon = Sun;
                  
                  if (code === 0) { desc = 'clear sky'; WeatherIcon = Sun; }
                  else if (code >= 1 && code <= 3) { desc = 'partly cloudy'; WeatherIcon = Cloud; }
                  else if (code >= 45 && code <= 48) { desc = 'fog'; WeatherIcon = Cloud; }
                  else if (code >= 51 && code <= 67) { desc = 'rain'; WeatherIcon = Cloud; }
                  else if (code >= 71 && code <= 77) { desc = 'snow'; WeatherIcon = Cloud; }
                  else if (code >= 95) { desc = 'thunderstorm'; WeatherIcon = Cloud; }

                  // simple day/night check for clear sky
                  const hour = new Date().getHours();
                  if (code === 0 && (hour >= 19 || hour <= 5)) {
                      WeatherIcon = Moon;
                  }

                  setWeather({ temp, desc, icon: WeatherIcon });
              }
          } catch (error) {
              console.error("Failed to fetch weather", error);
          }
      };

      fetchStats();
      fetchWeather();
  }, [user]);

  if (user?.role !== 'student') {
      return (
          <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                  <div>
                      <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Dashboard</h1>
                      <p className="text-sm font-medium text-gray-500">System Overview & Management</p>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl text-blue-700 font-bold text-sm border border-blue-100">
                      <weather.icon size={18} />
                      <span>{weather.temp}°C {weather.desc}</span>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                      <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                          <Users className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Students</span>
                      <h2 className="text-3xl font-black text-gray-900 mt-1">{adminStats?.totalStudents || 0}</h2>
                      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit uppercase">
                          <span>Active Learners</span>
                      </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                      <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                          <BookOpen className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Courses</span>
                      <h2 className="text-3xl font-black text-gray-900 mt-1">{adminStats?.totalCourses || 0}</h2>
                      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full w-fit uppercase">
                          <span>Curriculum Depth</span>
                      </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                      <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                          <GraduationCap className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Avg. Attendance</span>
                      <h2 className="text-3xl font-black text-gray-900 mt-1">{adminStats?.avgAttendance || '0%'}</h2>
                      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full w-fit uppercase">
                          <span>Punctuality Rate</span>
                      </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                      <div className="h-12 w-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                          <MonitorPlay className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Recent Grads</span>
                      <h2 className="text-3xl font-black text-gray-900 mt-1">{adminStats?.recentGraduates || 0}</h2>
                      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full w-fit uppercase">
                          <span>Placement Ready</span>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans">
      
      {/* Top 5 Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <TopCard 
            title="Important Links" 
            action="CLICK HERE" 
            icon={BookOpen} 
            iconColor="text-[#4378ff]" 
            iconBg="bg-blue-50"
        />
        <TopCard 
            title="Student Facilitation" 
            action="CLICK TO VIEW" 
            icon={MonitorPlay} 
            iconColor="text-[#9d4edd]" 
            iconBg="bg-purple-50"
        />
        <TopCard 
            title="Anti Ragging" 
            action="READ NOW" 
            icon={XCircle} 
            iconColor="text-[#9d4edd]" 
            iconBg="bg-purple-50"
        />
        <TopCard 
            title="GP LMS" 
            action="CLICK HERE" 
            icon={GraduationCap} 
            bgClass="bg-[#0f4c5c]"
            textClass="text-white"
            iconColor="text-white" 
            iconBg="bg-transparent border border-white/20"
        />
        <TopCard 
            title="My University Email" 
            action="VIEW DETAILS" 
            icon={Mail} 
            iconColor="text-[#4378ff]" 
            iconBg="bg-blue-50"
        />
      </div>

      {/* Middle Row: Weather and ID Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weather Widget */}
        <div className="lg:col-span-2 bg-[#204a70] rounded-xl flex items-center justify-between px-8 py-5 text-white shadow-sm">
            <h3 className="text-lg font-bold tracking-widest text-white/90 text-center flex-1">
                GPIMS<br/><span className="text-xs font-medium uppercase tracking-[0.2em]">Weather</span>
            </h3>
            <div className="flex items-center gap-6 flex-1 justify-center">
                <weather.icon size={40} className="text-white" strokeWidth={1} />
                <div>
                    <div className="text-3xl font-bold">{weather.temp}°C</div>
                    <div className="text-sm opacity-80 capitalize">{weather.desc}</div>
                </div>
            </div>
            <div className="flex-1"></div>
        </div>

        {/* Download ID Card */}
        <div className="bg-white rounded-xl flex items-center justify-between p-5 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-[#1f2937]">Download Virtual ID Card</h3>
            <button className="bg-[#e0e7ff] text-[#4338ca] px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#c7d2fe] transition-colors shadow-sm">
                Download Now
            </button>
        </div>

      </div>

      {/* Bottom Row: 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Important Message */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-[450px] flex flex-col">
            <h3 className="text-[#1e3a8a] text-lg font-bold mb-4">Important Message</h3>
            <div className="bg-[#f3f4f6] rounded-xl p-5 flex-1 overflow-y-auto">
                <p className="text-sm text-gray-700 leading-relaxed">
                    {studentStats?.pendingDocuments || "Loading messages..."}
                </p>
            </div>
        </div>

        {/* Column 2: My Course & Attendance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-[450px] flex flex-col">
            <h3 className="text-[#1e3a8a] text-lg font-bold mb-4">My Course & Attendance</h3>
            <p className="text-[13px] font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
                Diploma in Computer Science and Engineering - CS202
            </p>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <table className="w-full text-sm text-left">
                    <thead className="text-[13px] text-gray-900 font-bold border-b border-gray-200 sticky top-0 bg-white">
                        <tr>
                            <th className="py-2 pr-4 font-bold">Subject</th>
                            <th className="py-2 pl-2 font-bold text-right">Attendance %</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {studentStats?.courseAttendance?.map((course, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="py-3 pr-4 text-gray-600 font-medium">
                                    {course.subject} <span className="text-gray-400 block text-[11px] mt-0.5">({course.code})</span>
                                </td>
                                <td className="py-3 pl-2 text-right">
                                    <span className={`font-bold ${course.percentage >= 75 ? 'text-[#059669]' : 'text-[#dc2626]'}`}>
                                        {course.percentage}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {(!studentStats?.courseAttendance || studentStats.courseAttendance.length === 0) && (
                            <tr><td colSpan="3" className="text-center py-4 text-gray-500 text-sm">No courses found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Column 3: Announcements */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-[450px] flex flex-col">
            <h3 className="text-[#1e3a8a] text-lg font-bold mb-4">Announcements ( ALL )</h3>
            
            <div className="flex gap-3 mb-5">
                <div className="relative flex-1">
                    <input 
                        type="text" 
                        placeholder="Search Announcement" 
                        className="w-full bg-[#f3f4f6] text-sm rounded-lg py-2.5 px-4 outline-none border border-transparent focus:border-gray-300"
                    />
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <div className="relative w-24">
                    <select className="w-full bg-[#f3f4f6] text-sm rounded-lg py-2.5 pl-3 pr-8 outline-none border border-transparent appearance-none font-medium">
                        <option>ALL</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-500 pointer-events-none" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1">
                {studentStats?.announcements?.map((ann, idx) => (
                    <div key={idx} className="bg-[#f9fafb] border border-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                        <h4 className="font-bold text-gray-900 text-sm mb-3 leading-snug">{ann.title}</h4>
                        
                        <div className="flex gap-2 mb-3">
                            <span className="bg-[#4b5563] text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                {ann.date}
                            </span>
                            <span className="bg-[#4b5563] text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                {ann.time}
                            </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3 border-b border-gray-200 pb-3">
                            {ann.tags.map((tag, tIdx) => (
                                <span key={tIdx} className="text-[9px] font-bold text-[#e60000] border border-[#e60000] px-1.5 py-0.5 rounded uppercase">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        
                        <div className="text-[11px] text-gray-600 leading-relaxed font-medium">
                            <p className="mb-1 text-gray-900">{ann.ref}</p>
                            <p className="whitespace-pre-line">{ann.desc}</p>
                            <p className="mt-2 text-gray-500 italic">*Believe in your journey, trust your hard work...</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
