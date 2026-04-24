import express from 'express';
import Student from '../models/studentModel.js';
import User from '../models/userModel.js';
import { protect, admin, staff } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Staff
router.get('/', protect, staff, async (req, res) => {
    try {
        const students = await Student.find({}).populate('user', 'name email');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get student profile
// @route   GET /api/students/profile
// @access  Private/Student
router.get('/profile', protect, async (req, res) => {
    try {
        const student = await Student.findOne({ user: req.user._id }).populate('courses');
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Register a student
// @route   POST /api/students
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { userId, enrollmentNumber, department, semester } = req.body;
        
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const studentExists = await Student.findOne({ enrollmentNumber });
        if (studentExists) {
            return res.status(400).json({ message: 'Student with this enrollment number already exists' });
        }

        const student = await Student.create({
            user: userId,
            enrollmentNumber,
            department,
            semester,
        });

        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
