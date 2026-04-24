import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getDashboardStats = async () => {
    const { data } = await api.get('/dashboard/stats');
    return data;
};

export const getStudentDashboardStats = async () => {
    const { data } = await api.get('/dashboard/student-stats');
    return data;
};

export const getStudents = async () => {
    const { data } = await api.get('/students');
    return data;
};

export const getCourses = async () => {
    const { data } = await api.get('/courses');
    return data;
};

export const addCourse = async (courseData) => {
    const { data } = await api.post('/courses', courseData);
    return data;
};

export const addStudent = async (studentData) => {
    const { data } = await api.post('/students', studentData);
    return data;
};

export const adminCreateUser = async (userData) => {
    const { data } = await api.post('/users', userData);
    return data;
};

export const getNotifications = async () => {
    const { data } = await api.get('/notifications');
    return data;
};

export const markAttendance = async (attendanceData) => {
    const { data } = await api.post('/attendance', attendanceData);
    return data;
};

export const updateResult = async (resultData) => {
    const { data } = await api.post('/results', resultData);
    return data;
};

export default api;
