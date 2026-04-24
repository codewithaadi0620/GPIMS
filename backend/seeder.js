import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Student from './models/studentModel.js';
import Course from './models/courseModel.js';
import Attendance from './models/attendanceModel.js';
import Result from './models/resultModel.js';
import Notification from './models/notificationModel.js';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Student.deleteMany();
        await Course.deleteMany();
        await Attendance.deleteMany();
        await Result.deleteMany();
        await Notification.deleteMany();

        console.log('Data Cleared!');

        // 1. Create Users
        const admin = await User.create({
            name: 'System Admin',
            email: 'admin@gpims.com',
            password: 'admin123',
            role: 'admin'
        });

        const staff = await User.create({
            name: 'Prof. Rajesh Kumar',
            email: 'staff@gpims.com',
            password: 'staff123',
            role: 'staff'
        });

        const studentUser1 = await User.create({
            name: 'John Doe',
            email: 'student@gpims.com',
            password: 'student123',
            role: 'student'
        });

        const studentUser2 = await User.create({
            name: 'Jane Smith',
            email: 'jane@gpims.com',
            password: 'password123',
            role: 'student'
        });

        // 2. Create Courses
        const courses = await Course.insertMany([
            {
                title: 'Data Structures & Algorithms',
                code: 'CS101',
                credits: 4,
                instructor: 'Prof. Rajesh Kumar'
            },
            {
                title: 'Full Stack Web Development',
                code: 'CS202',
                credits: 4,
                instructor: 'Dr. Sarah Wilson'
            },
            {
                title: 'Database Management Systems',
                code: 'CS303',
                credits: 3,
                instructor: 'Prof. Amit Shah'
            },
            {
                title: 'Communication Skills',
                code: 'HU101',
                credits: 2,
                instructor: 'Ms. Priya Verma'
            }
        ]);

        console.log('Courses Created!');

        // 3. Create Students (Linking to Users and Courses)
        const student1 = await Student.create({
            user: studentUser1._id,
            enrollmentNumber: 'GP2024001',
            department: 'Computer Science',
            semester: 4,
            courses: [courses[0]._id, courses[1]._id, courses[2]._id],
            pendingDocumentsMessage: 'Please submit your 10th marksheet original for verification.'
        });

        const student2 = await Student.create({
            user: studentUser2._id,
            enrollmentNumber: 'GP2024002',
            department: 'Information Technology',
            semester: 2,
            courses: [courses[0]._id, courses[3]._id],
            pendingDocumentsMessage: 'No pending documents.'
        });

        console.log('Students Created!');

        // 4. Create Attendance (Past 5 days for Student 1)
        const dates = [];
        for (let i = 0; i < 5; i++) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            dates.push(d);
        }

        const attendanceRecords = [];
        courses.slice(0, 3).forEach(course => {
            dates.forEach(date => {
                attendanceRecords.push({
                    course: course._id,
                    student: student1._id,
                    date: date,
                    status: Math.random() > 0.2 ? 'Present' : 'Absent'
                });
            });
        });

        await Attendance.insertMany(attendanceRecords);
        console.log('Attendance Records Created!');

        // 5. Create Results
        await Result.insertMany([
            {
                student: student1._id,
                course: courses[0]._id,
                marks: 85,
                totalMarks: 100,
                grade: 'A',
                remarks: 'Excellent performance in labs.'
            },
            {
                student: student1._id,
                course: courses[1]._id,
                marks: 92,
                totalMarks: 100,
                grade: 'O',
                remarks: 'Outstanding project work.'
            },
            {
                student: student1._id,
                course: courses[2]._id,
                marks: 78,
                totalMarks: 100,
                grade: 'B+',
                remarks: 'Good understanding of SQL.'
            }
        ]);

        console.log('Results Created!');

        // 6. Create Notifications
        await Notification.insertMany([
            {
                title: 'Welcome to GPIMS',
                message: 'Welcome to the new Government Polytechnique Information Management System. Please update your profile.',
                type: 'info'
            },
            {
                title: 'Mid-Semester Examination',
                message: 'The mid-semester examinations for the current session will begin from May 15th, 2026.',
                type: 'warning'
            },
            {
                title: 'Fee Payment Deadline',
                message: 'Last date for semester fee submission is April 30th, 2026 to avoid fine.',
                type: 'error'
            },
            {
                title: 'Hackathon 2026',
                message: 'Registration for the annual Inter-Polytechnic Hackathon is now open. Register by May 5th.',
                type: 'success'
            }
        ]);

        console.log('Notifications Created!');

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();

        await User.deleteMany();
        await Student.deleteMany();
        await Course.deleteMany();
        await Attendance.deleteMany();
        await Result.deleteMany();
        await Notification.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
