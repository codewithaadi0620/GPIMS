import React from 'react';
import { Menu, Bell, Search, BookOpen, Home, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
      
      {/* Left side: Menu and Logo */}
      <div className="flex items-center gap-6">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-black focus:outline-none"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
        
        {/* Logo */}
        <div className="hidden sm:flex items-center gap-1 cursor-pointer">
            <div className="bg-[#e60000] text-white font-black text-2xl px-1.5 py-0.5 rounded-full w-10 h-10 flex items-center justify-center">
                GP
            </div>
            <div className="flex flex-col">
                <span className="text-black font-black text-2xl tracking-tighter leading-none">IMS</span>
                <span className="text-black font-bold text-[4px] tracking-[0.1em] uppercase opacity-70">
                    Govt Polytechnique Information
                </span>
                <span className="text-black font-bold text-[4px] tracking-[0.1em] uppercase opacity-70">
                    Management System
                </span>
            </div>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search & Bookmark your page" 
              className="w-full bg-[#f1f3f5] text-sm text-gray-700 placeholder-gray-500 border-none rounded-full py-2.5 px-6 focus:ring-1 focus:ring-gray-300 outline-none"
            />
            <Search size={16} className="absolute right-5 top-3 text-gray-500" strokeWidth={2} />
          </div>
      </div>

      {/* Right side: Icons & Profile */}
      <div className="flex items-center gap-6">
        
        <div className="hidden sm:flex items-center gap-5 text-gray-600">
            <button className="hover:text-black transition-colors"><Bell size={20} strokeWidth={1.5} /></button>
            <button className="hover:text-black transition-colors"><BookOpen size={20} strokeWidth={1.5} /></button>
            <button className="hover:text-black transition-colors"><Home size={20} strokeWidth={1.5} /></button>
            <button className="hover:text-black transition-colors"><Settings size={20} strokeWidth={1.5} /></button>
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#2a3042] uppercase">{user?.name || 'STUDENT'}</p>
            <p className="text-[10px] text-gray-500 uppercase mt-0.5 tracking-wider">{user?.enrollmentNumber || user?.email?.split('@')[0] || 'STU001'}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold overflow-hidden border-2 border-white shadow-sm">
             {/* If we had a real avatar, we'd use an img tag here */}
             <span className="text-sm">{user?.name?.charAt(0) || 'U'}</span>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;
