    import mongoose from 'mongoose';

const courseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        credits: {
            type: Number,
            required: true,
        },
        instructor: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
