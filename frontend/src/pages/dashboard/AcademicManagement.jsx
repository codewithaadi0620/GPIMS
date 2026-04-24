import React, { useState, useEffect } from 'react';
import { getStudents, getCourses, markAttendance, updateResult } from '../../services/api';
import { BookOpen, UserCheck, Award, Calendar, Search, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AcademicManagement = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [activeTab, setActiveTab] = useState('attendance'); // 'attendance' or 'marks'
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Attendance State
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceStatus, setAttendanceStatus] = useState('Present');

    // Marks State
    const [marks, setMarks] = useState('');
    const [totalMarks, setTotalMarks] = useState('100');
    const [grade, setGrade] = useState('A');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsData, coursesData] = await Promise.all([
                    getStudents(),
                    getCourses()
                ]);
                setStudents(studentsData);
                setCourses(coursesData);
            } catch (error) {
                console.error("Failed to fetch data", error);
                setMessage({ type: 'error', text: 'Failed to load data. Please try again.' });
            }
        };
        fetchData();
    }, []);

    const handleAttendanceSubmit = async (e) => {
        e.preventDefault();
        if (!selectedStudent || !selectedCourse) {
            setMessage({ type: 'error', text: 'Please select both student and course.' });
            return;
        }

        setIsLoading(true);
        try {
            await markAttendance({
                studentId: selectedStudent,
                courseId: selectedCourse,
                date: attendanceDate,
                status: attendanceStatus
            });
            setMessage({ type: 'success', text: 'Attendance marked successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to mark attendance.' });
        }
        setIsLoading(false);
    };

    const handleMarksSubmit = async (e) => {
        e.preventDefault();
        if (!selectedStudent || !selectedCourse || !marks) {
            setMessage({ type: 'error', text: 'Please fill in all required fields.' });
            return;
        }

        setIsLoading(true);
        try {
            await updateResult({
                studentId: selectedStudent,
                courseId: selectedCourse,
                marks: Number(marks),
                totalMarks: Number(totalMarks),
                grade,
                remarks
            });
            setMessage({ type: 'success', text: 'Marks updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update marks.' });
        }
        setIsLoading(false);
    };

    return (
        <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Academic Management</h1>
                    <p className="text-sm font-medium text-gray-500">Manage Student Attendance and Results</p>
                </div>
            </div>

            <AnimatePresence>
                {message.text && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`p-4 rounded-2xl flex items-center gap-3 font-bold text-sm ${
                            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}
                    >
                        {message.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                        {message.text}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Selection Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                                <BookOpen size={16} className="text-blue-500" />
                                Select Course
                            </label>
                            <select 
                                className="w-full bg-gray-50 border border-transparent focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all font-medium text-sm"
                                value={selectedCourse}
                                onChange={(e) => setSelectedCourse(e.target.value)}
                            >
                                <option value="">Choose Course...</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>{course.title} ({course.code})</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                                <Search size={16} className="text-blue-500" />
                                Select Student
                            </label>
                            <select 
                                className="w-full bg-gray-50 border border-transparent focus:border-blue-500 rounded-xl px-4 py-3 outline-none transition-all font-medium text-sm"
                                value={selectedStudent}
                                onChange={(e) => setSelectedStudent(e.target.value)}
                            >
                                <option value="">Choose Student...</option>
                                {students.map(student => (
                                    <option key={student._id} value={student._id}>{student.user?.name} ({student.enrollmentNumber})</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Management Section */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-100">
                            <button 
                                onClick={() => { setActiveTab('attendance'); setMessage({ type: '', text: '' }); }}
                                className={`flex-1 py-5 font-black text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
                                    activeTab === 'attendance' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                <UserCheck size={18} />
                                Attendance
                            </button>
                            <button 
                                onClick={() => { setActiveTab('marks'); setMessage({ type: '', text: '' }); }}
                                className={`flex-1 py-5 font-black text-sm uppercase tracking-widest transition-colors flex items-center justify-center gap-2 ${
                                    activeTab === 'marks' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                <Award size={18} />
                                Marks & Results
                            </button>
                        </div>

                        <div className="p-8">
                            {activeTab === 'attendance' ? (
                                <form onSubmit={handleAttendanceSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Date</label>
                                            <div className="relative">
                                                <input 
                                                    type="date" 
                                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                                    value={attendanceDate}
                                                    onChange={(e) => setAttendanceDate(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Status</label>
                                            <select 
                                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={attendanceStatus}
                                                onChange={(e) => setAttendanceStatus(e.target.value)}
                                            >
                                                <option value="Present">Present</option>
                                                <option value="Absent">Absent</option>
                                                <option value="Late">Late</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-blue-600 text-white font-black text-sm uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Processing...' : 'Mark Attendance'}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleMarksSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Obtained Marks</label>
                                            <input 
                                                type="number" 
                                                placeholder="Enter Marks"
                                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={marks}
                                                onChange={(e) => setMarks(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Marks</label>
                                            <input 
                                                type="number" 
                                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={totalMarks}
                                                onChange={(e) => setTotalMarks(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Grade</label>
                                            <select 
                                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={grade}
                                                onChange={(e) => setGrade(e.target.value)}
                                            >
                                                <option value="O">O (Outstanding)</option>
                                                <option value="A+">A+</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="F">F (Fail)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Remarks</label>
                                            <input 
                                                type="text" 
                                                placeholder="Good Performance"
                                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                                value={remarks}
                                                onChange={(e) => setRemarks(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-indigo-600 text-white font-black text-sm uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                                    >
                                        {isLoading ? 'Processing...' : 'Upload Results'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicManagement;
