import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, adminCreateUser } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Users, Search, Filter, MoreVertical, Plus } from 'lucide-react';
import Modal from '../../components/Modal';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        enrollmentNumber: '',
        department: '',
        semester: '1'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const { user } = useAuth();

    const fetchStudents = async () => {
        try {
            setLoading(true);
            if (user?.role === 'admin') {
                const data = await getStudents();
                setStudents(data);
            }
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setIsSubmitting(true);

        try {
            // Generate UID
            const generatedUid = 'GP' + Math.floor(100000 + Math.random() * 900000);

            // 1. Create User
            const userData = await adminCreateUser({
                name: formData.name,
                email: formData.email,
                password: formData.dob, // Use DOB as password
                role: 'student',
                uid: generatedUid
            });

            // 2. Create Student profile
            await addStudent({
                userId: userData._id,
                enrollmentNumber: formData.enrollmentNumber,
                department: formData.department,
                semester: formData.semester
            });

            setIsModalOpen(false);
            setFormData({
                name: '',
                email: '',
                dob: '',
                enrollmentNumber: '',
                department: '',
                semester: '1'
            });
            fetchStudents();
            setSuccessMsg(`Student Added! UID: ${generatedUid} | Password: ${formData.dob}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add student');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (user?.role !== 'admin') {
        return <div className="p-8 text-center text-gray-500">Access Denied. Admins only.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Students</h1>
                    <p className="text-sm text-gray-500">View and manage all registered students</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Plus size={18} />
                    <span>Add Student</span>
                </button>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Add New Student"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}
                    {successMsg && (
                        <div className="p-3 bg-green-50 text-green-700 text-sm font-bold rounded-lg border border-green-200">
                            {successMsg}
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Enrollment Number</label>
                            <input
                                type="text"
                                name="enrollmentNumber"
                                required
                                value={formData.enrollmentNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                placeholder="GP12345"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</label>
                            <select
                                name="department"
                                required
                                value={formData.department}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            >
                                <option value="">Select Department</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Civil">Civil</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Semester</label>
                            <select
                                name="semester"
                                required
                                value={formData.semester}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            >
                                {[1, 2, 3, 4, 5, 6].map(s => (
                                    <option key={s} value={s.toString()}>Semester {s}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date of Birth (Password)</label>
                            <input
                                type="date"
                                name="dob"
                                required
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
                        >
                            {isSubmitting ? 'Adding...' : 'Add Student'}
                        </button>
                    </div>
                </form>
            </Modal>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search students..." 
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-gray-600 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center">
                        <Filter size={18} />
                        <span>Filters</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Enrollment No.</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Semester</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading students...</td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No students found</td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{student.user?.name || 'N/A'}</span>
                                                <span className="text-xs text-gray-400">{student.user?.email || ''}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs">{student.enrollmentNumber}</td>
                                        <td className="px-6 py-4">{student.department}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                                                Semester {student.semester}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Students;
