import React, { useState, useEffect } from 'react';
import { getCourses, addCourse } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import Modal from '../../components/Modal';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        credits: '3',
        instructor: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const { user } = useAuth();

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await getCourses();
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            await addCourse(formData);
            setIsModalOpen(false);
            setFormData({
                title: '',
                code: '',
                credits: '3',
                instructor: ''
            });
            fetchCourses();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add course');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Course Offerings</h1>
                    <p className="text-sm text-gray-500">View and manage university courses</p>
                </div>
                {user?.role === 'admin' && (
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Add Course</span>
                    </button>
                )}
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Add New Course"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                placeholder="Introduction to Computer Science"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Course Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    required
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    placeholder="CS101"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Credits</label>
                                <select
                                    name="credits"
                                    required
                                    value={formData.credits}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                >
                                    {[1, 2, 3, 4, 5].map(c => (
                                        <option key={c} value={c.toString()}>{c} Credits</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Instructor</label>
                            <input
                                type="text"
                                name="instructor"
                                required
                                value={formData.instructor}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                placeholder="Dr. Smith"
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
                            {isSubmitting ? 'Adding...' : 'Add Course'}
                        </button>
                    </div>
                </form>
            </Modal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-12 text-center text-gray-500">Loading courses...</div>
                ) : courses.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-gray-500">No courses available.</div>
                ) : (
                    courses.map((course) => (
                        <div key={course._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                    <BookOpen size={24} />
                                </div>
                                {user?.role === 'admin' && (
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{course.title}</h3>
                            <p className="text-sm font-medium text-gray-500 mb-4">{course.code}</p>
                            
                            <div className="mt-auto space-y-3 pt-4 border-t border-gray-50">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Credits</span>
                                    <span className="font-semibold text-gray-900">{course.credits}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Instructor</span>
                                    <span className="font-semibold text-gray-900">{course.instructor}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Courses;
