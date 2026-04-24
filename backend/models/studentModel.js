import mongoose from 'mongoose';

const studentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        enrollmentNumber: {
            type: String,
            required: true,
            unique: true,
        },
        department: {
            type: String,
            required: true,
        },
        semester: {
            type: Number,
            required: true,
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
        ],
        pendingDocumentsMessage: {
            type: String,
            default: 'No pending documents.',
        },
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
