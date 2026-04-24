import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Student from '../models/studentModel.js';
import Course from '../models/courseModel.js';
import Attendance from '../models/attendanceModel.js';
import Notification from '../models/notificationModel.js';

const router = express.Router();

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
router.get('/stats', protect, async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalCourses = await Course.countDocuments();
        
        // Very basic aggregation for average attendance (mocked for simplicity in UI, but this is real backend count)
        const totalAttendanceRecords = await Attendance.countDocuments();
        const presentRecords = await Attendance.countDocuments({ status: 'Present' });
        
        let avgAttendance = 0;
        if (totalAttendanceRecords > 0) {
            avgAttendance = Math.round((presentRecords / totalAttendanceRecords) * 100);
        }

        res.json({
            totalStudents,
            totalCourses,
            avgAttendance: `${avgAttendance}%`,
            recentGraduates: 320 // mock data for now
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get student personal dashboard stats
// @route   GET /api/dashboard/student-stats
// @access  Private (Student)
router.get('/student-stats', protect, async (req, res) => {
    try {
        let studentRecord = await Student.findOne({ user: req.user._id }).populate('courses');
        let courses = studentRecord ? studentRecord.courses : [];
        let courseAttendance = [];

        for (let course of courses) {
            let percentage = 0;
            if (studentRecord) {
                const total = await Attendance.countDocuments({ course: course._id, student: studentRecord._id });
                if (total > 0) {
                    const present = await Attendance.countDocuments({ course: course._id, student: studentRecord._id, status: 'Present' });
                    percentage = Math.round((present / total) * 100);
                }
            }

            courseAttendance.push({
                subject: course.title,
                code: course.code,
                sem: course.credits || 4, // use credits as sem for UI matching
                percentage: percentage
            });
        }

        // Fetch real announcements (notifications)
        const rawNotifications = await Notification.find({
            $or: [{ recipient: null }, { recipient: req.user._id }]
        }).sort({ createdAt: -1 }).limit(10);

        const announcements = rawNotifications.map(notif => {
            const dateObj = new Date(notif.createdAt);
            const dateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
            const timeStr = dateObj.toLocaleTimeString('en-US', { hour12: false });
            return {
                title: notif.title,
                date: dateStr,
                time: timeStr,
                tags: [notif.type.toUpperCase(), "SYSTEM"], // Using type as tag for now
                ref: `Ref. No: SYS/${dateObj.getFullYear()}/${notif._id.toString().substring(0, 6)}`,
                desc: notif.message
            };
        });

        res.json({
            courseAttendance,
            announcements,
            pendingDocuments: studentRecord ? studentRecord.pendingDocumentsMessage : "No pending documents."
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
