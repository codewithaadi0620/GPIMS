import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, BookOpen, Users, Building, Cloud, Sun, CloudRain } from 'lucide-react';

const PortalCard = ({ title, desc, icon, delay, linkTo }) => (
    <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, type: "spring", bounce: 0.4 }}
        className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.15)] max-w-[280px] w-full flex flex-col items-center text-center z-10 group hover:-translate-y-2 transition-transform duration-300"
    >
        <div className="mb-6 text-black group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
        <p className="text-sm text-gray-600 mb-8 flex-grow leading-relaxed">
            {desc}
        </p>
        <Link
            to={linkTo}
            className="bg-[#e60000] text-white px-8 py-2.5 rounded-full font-bold hover:bg-[#cc0000] transition-colors w-fit shadow-md shadow-red-500/30"
        >
            Login Now
        </Link>
    </motion.div>
);

const WeatherDay = ({ day, tempHigh, tempLow, icon }) => (
    <div className="flex flex-col items-center text-white px-4">
        <span className="text-sm font-medium mb-2">{day}</span>
        <div className="mb-2">{icon}</div>
        <span className="text-sm font-bold">{tempHigh}°C <span className="font-normal opacity-70 ml-1">{tempLow}°C</span></span>
    </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-white relative flex flex-col font-sans">
      
      {/* Background Red Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full h-[45%] bg-[#e60000] z-0"></div>

      <div className="relative z-10 flex flex-col flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        
        {/* Header / Logo Area */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mt-12 mb-16"
        >
            <div className="flex items-center gap-2">
                <div className="bg-[#e60000] text-white font-black text-6xl px-2 py-1 rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
                    GP
                </div>
                <div className="flex flex-col">
                    <span className="text-black font-black text-6xl tracking-tighter leading-none">IMS</span>
                    <span className="text-black font-bold text-xs tracking-[0.2em] mt-1 uppercase">
                        Govt Polytechnique Information
                    </span>
                    <span className="text-black font-bold text-[10px] tracking-[0.2em] uppercase opacity-70">
                        Management System
                    </span>
                </div>
            </div>
        </motion.div>

        {/* Portal Cards */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-stretch mb-16">
            <PortalCard 
                delay={0.1}
                title="Student Login"
                desc="Login with your UID and Password to access your Student Services and Account. The GPIMS will keep a record of your progress."
                icon={<User size={64} strokeWidth={1.5} />}
                linkTo="/login/student"
            />
            <PortalCard 
                delay={0.2}
                title="LMS Login"
                desc="Login to your LMS using your UID/EmployeeID and GPIMS password. Access coursework, assignments, and digital library."
                icon={<BookOpen size={64} strokeWidth={1.5} />}
                linkTo="/login/lms"
            />
            <PortalCard 
                delay={0.3}
                title="Staff Login"
                desc="Login using your Employee Code and Password to access your account, keep track of your progress and other official services."
                icon={<Users size={64} strokeWidth={1.5} />}
                linkTo="/login/staff"
            />
            <PortalCard 
                delay={0.4}
                title="Admission Login"
                desc="For Admission Staff only. Use your Employee Code and Password to log in for admission related services and inquiries."
                icon={<Building size={64} strokeWidth={1.5} />}
                linkTo="/login/admission"
            />
        </div>

        {/* Footer / Weather Area */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-auto flex flex-col md:flex-row items-center justify-between bg-[#cc0000] rounded-3xl p-6 shadow-inner"
        >
            <div className="flex items-center gap-6 mb-6 md:mb-0">
                <div className="text-white text-right">
                    <h4 className="font-bold text-lg leading-tight">CAMPUS<br/>WEATHER</h4>
                </div>
                <Cloud className="text-white h-12 w-12 opacity-90" />
                <div className="text-white">
                    <div className="text-4xl font-black">29°C</div>
                    <div className="text-sm opacity-90">few clouds</div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-6">
                <WeatherDay day="Thursday" tempHigh="42" tempLow="25" icon={<Sun size={24} />} />
                <WeatherDay day="Friday" tempHigh="44" tempLow="26" icon={<Cloud size={24} />} />
                <WeatherDay day="Saturday" tempHigh="44" tempLow="27" icon={<Cloud size={24} />} />
                <WeatherDay day="Sunday" tempHigh="44" tempLow="28" icon={<Sun size={24} />} />
                <WeatherDay day="Monday" tempHigh="45" tempLow="28" icon={<Cloud size={24} />} />
                <WeatherDay day="Tuesday" tempHigh="41" tempLow="28" icon={<CloudRain size={24} />} />
                <WeatherDay day="Wednesday" tempHigh="40" tempLow="24" icon={<CloudRain size={24} />} />
            </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Home;
