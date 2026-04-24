import mongoose from 'mongoose';

const resultSchema = mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Student',
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Course',
        },
        marks: {
            type: Number,
            required: true,
        },
        totalMarks: {
            type: Number,
            required: true,
            default: 100,
        },
        grade: {
            type: String,
            required: true,
        },
        remarks: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

resultSchema.index({ student: 1, course: 1 }, { unique: true });

const Result = mongoose.model('Result', resultSchema);

export default Result;
