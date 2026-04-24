import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronRight,
  LogOut,
  ChevronLeft
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminMenuItems = [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/dashboard/students', name: 'Students' },
    { path: '/dashboard/courses', name: 'Courses' },
    { path: '/dashboard/attendance', name: 'Attendance' },
    { path: '/dashboard/results', name: 'Results' },
    { path: '/dashboard/notifications', name: 'Notifications' },
  ];

  const studentMenuItems = [
    { path: '/dashboard', name: 'Academics' },
    { path: '/dashboard/accounts', name: 'Accounts' },
    { path: '/dashboard/administration', name: 'Administration' },
    { path: '/dashboard/loan', name: 'Apply for Loan Documents' },
    { path: '/dashboard/noc', name: 'Apply for NOC' },
    { path: '/dashboard/csw', name: 'Centre For Student Wellbeing (CSW)' },
    { path: '/dashboard/counseling', name: 'Counseling Therapy Clinic Registration' },
    { path: '/dashboard/dcpd', name: 'DCPD' },
    { path: '/dashboard/mooc', name: 'DLL MOOC Coordinator List' },
    { path: '/dashboard/elibrary', name: 'E Library' },
    { path: '/dashboard/examination', name: 'Examination' },
    { path: '/dashboard/hostel', name: 'Hostel' },
    { path: '/dashboard/international', name: 'International Study Opportunities' },
    { path: '/dashboard/library', name: 'Library' },
  ];

  const staffMenuItems = [
    { path: '/dashboard', name: 'Staff Dashboard' },
    { path: '/dashboard/staff-portal', name: 'Academic Management' },
    { path: '/dashboard/notifications', name: 'Notifications' },
  ];

  const menuItems = user?.role === 'admin' 
    ? adminMenuItems 
    : user?.role === 'staff' 
      ? staffMenuItems 
      : studentMenuItems;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50 flex flex-col shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
      >
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-3 rounded hover:bg-gray-50 transition-colors ${
                  isActive ? 'text-[#e60000] font-medium' : 'text-[#2a3042]'
                }`}
              >
                <span className="text-[13px]">{item.name}</span>
                <ChevronRight size={14} className="text-gray-400" />
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={logout}
            className="w-full flex items-center justify-between px-3 py-3 rounded text-[#2a3042] hover:bg-red-50 hover:text-red-600 transition-colors text-[13px]"
          >
            <span>Logout</span>
            <LogOut size={14} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
