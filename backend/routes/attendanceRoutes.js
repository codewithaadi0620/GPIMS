import express from 'express';
import { protect, admin, staff } from '../middleware/authMiddleware.js';
import Attendance from '../models/attendanceModel.js';
import Student from '../models/studentModel.js';

const router = express.Router();

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Private/Staff
router.post('/', protect, staff, async (req, res) => {
    try {
        const { courseId, studentId, date, status } = req.body;

        const attendanceExists = await Attendance.findOne({ course: courseId, student: studentId, date });
        
        if (attendanceExists) {
            attendanceExists.status = status;
            await attendanceExists.save();
            return res.json(attendanceExists);
        }

        const attendance = await Attendance.create({
            course: courseId,
            student: studentId,
            date,
            status
        });

        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get student attendance
// @route   GET /api/attendance/student/:studentId
// @access  Private
router.get('/student/:studentId', protect, async (req, res) => {
    try {
        const attendance = await Attendance.find({ student: req.params.studentId }).populate('course', 'title code');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
