import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // If null/undefined, it's a broadcast to all
        },
        type: {
            type: String,
            enum: ['info', 'warning', 'success', 'error'],
            default: 'info',
        },
        readBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
