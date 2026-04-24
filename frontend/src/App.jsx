import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from './components/DashboardLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Students from './pages/dashboard/Students'
import Courses from './pages/dashboard/Courses'
import Attendance from './pages/dashboard/Attendance'
import Results from './pages/dashboard/Results'
import Notifications from './pages/dashboard/Notifications'
import StudentLogin from './pages/StudentLogin'
import StaffLogin from './pages/StaffLogin'
import AdmissionLogin from './pages/AdmissionLogin'
import AcademicManagement from './pages/dashboard/AcademicManagement'
import PlaceholderPage from './pages/dashboard/PlaceholderPage'
import { AuthProvider, useAuth } from './context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {/* Portal Routes */}
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/staff" element={<StaffLogin />} />
          <Route path="/login/admission" element={<AdmissionLogin />} />
          <Route path="/login/lms" element={<StudentLogin />} /> {/* Fallback to student for LMS */}
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="courses" element={<Courses />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="results" element={<Results />} />
            <Route path="notifications" element={<Notifications />} />
            
            {/* New Student Sections */}
            <Route path="accounts" element={<PlaceholderPage title="Accounts" />} />
            <Route path="administration" element={<PlaceholderPage title="Administration" />} />
            <Route path="loan" element={<PlaceholderPage title="Loan Documents" />} />
            <Route path="noc" element={<PlaceholderPage title="NOC Applications" />} />
            <Route path="csw" element={<PlaceholderPage title="Student Wellbeing (CSW)" />} />
            <Route path="counseling" element={<PlaceholderPage title="Counseling Therapy" />} />
            <Route path="dcpd" element={<PlaceholderPage title="DCPD" />} />
            <Route path="mooc" element={<PlaceholderPage title="DLL MOOC" />} />
            <Route path="elibrary" element={<PlaceholderPage title="E Library" />} />
            <Route path="examination" element={<PlaceholderPage title="Examination" />} />
            <Route path="hostel" element={<PlaceholderPage title="Hostel" />} />
            <Route path="international" element={<PlaceholderPage title="International Study" />} />
            <Route path="library" element={<PlaceholderPage title="Library" />} />

            {/* Staff Sections */}
            <Route path="staff-portal" element={<AcademicManagement />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
