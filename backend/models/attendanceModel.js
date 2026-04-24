import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Student',
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['Present', 'Absent', 'Late'],
            default: 'Present',
        },
    },
    {
        timestamps: true,
    }
);

// Create a compound index so a student can only have one attendance record per course per day
attendanceSchema.index({ course: 1, student: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
