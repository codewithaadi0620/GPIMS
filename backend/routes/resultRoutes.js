import express from 'express';
import { protect, admin, staff } from '../middleware/authMiddleware.js';
import Result from '../models/resultModel.js';

const router = express.Router();

// @desc    Add or update marks
// @route   POST /api/results
// @access  Private/Staff
router.post('/', protect, staff, async (req, res) => {
    try {
        const { studentId, courseId, marks, totalMarks, grade, remarks } = req.body;

        const resultExists = await Result.findOne({ student: studentId, course: courseId });
        
        if (resultExists) {
            resultExists.marks = marks;
            resultExists.totalMarks = totalMarks || resultExists.totalMarks;
            resultExists.grade = grade;
            resultExists.remarks = remarks;
            await resultExists.save();
            return res.json(resultExists);
        }

        const result = await Result.create({
            student: studentId,
            course: courseId,
            marks,
            totalMarks,
            grade,
            remarks
        });

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get student results
// @route   GET /api/results/student/:studentId
// @access  Private
router.get('/student/:studentId', protect, async (req, res) => {
    try {
        const results = await Result.find({ student: req.params.studentId }).populate('course', 'title code credits');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
