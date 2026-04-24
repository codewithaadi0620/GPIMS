import express from 'express';
import Course from '../models/courseModel.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, code, credits, instructor } = req.body;

        const courseExists = await Course.findOne({ code });
        if (courseExists) {
            return res.status(400).json({ message: 'Course code already exists' });
        }

        const course = await Course.create({
            title,
            code,
            credits,
            instructor,
        });

        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
