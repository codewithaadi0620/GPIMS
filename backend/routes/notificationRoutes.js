import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Notification from '../models/notificationModel.js';

const router = express.Router();

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const notifications = await Notification.find({
            $or: [
                { recipient: req.user._id },
                { recipient: null } // Broadcasts
            ]
        }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create notification
// @route   POST /api/notifications
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, message, recipient, type } = req.body;
        
        const notification = await Notification.create({
            title,
            message,
            recipient: recipient || null,
            type: type || 'info'
        });

        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
